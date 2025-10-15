import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { editJobEntryValidator, jobEntryValidator, } from "../validator/validator.js";
import ErrorWithStatusCode from "../errors/errorstatus.js";
import isAuthorized from "../middleware/authorized.js";
import aiServicesProvider from "../config/aiprovider.js";
import jobPostingPrompt from "../prompts/prompt.js";
import { Status } from "@prisma/client";
import prisma from "../config/prisma.js";
import pgvector from "pgvector";
import { insertEmbeddingIntoTable } from "../util/embedding.js";
import { converStringsToNumbers } from "../util/isnumber.js";
const postJobEntryController = [
    isAuthorized,
    jobEntryValidator,
    asyncHandler(async (req, res, next) => {
        const { id } = req.user;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
        }
        const { description, status, dateapplied, link } = req.body;
        const jobDescriptionPrompt = jobPostingPrompt(description);
        const response = await aiServicesProvider.generateResponse(jobDescriptionPrompt);
        const jobDescriptionObject = JSON.parse(response);
        if (jobDescriptionObject.error) {
            throw new ErrorWithStatusCode(jobDescriptionObject.error.message, 400);
        }
        const entry = await prisma.jobEntry.create({
            data: {
                ownerid: id,
                title: jobDescriptionObject[0].title,
                salary: jobDescriptionObject[0].salary.toString(),
                location: jobDescriptionObject[0].location,
                status: Status[status.toUpperCase()],
                company: jobDescriptionObject[0].company,
                dateapplied: new Date(dateapplied),
                link: link || "",
                description: description,
            },
        });
        const textEmbedding = await aiServicesProvider.generateEmbedding(description);
        const sqlTextEmbedding = await pgvector.toSql(textEmbedding);
        const insertResult = await insertEmbeddingIntoTable(sqlTextEmbedding, "JobEntry", entry.id);
        res.status(201).json({
            data: {
                message: "Job entry created successfully",
                status: 201,
                entry: entry,
            },
        });
    }),
];
//TODO Delete this function, made redundant by delete multiple entry
const deleteJobEntryController = [
    isAuthorized,
    asyncHandler(async (req, res, next) => {
        const { id } = req.user;
        const { jobEntryId } = req.params;
        const [parsedJobEntryId] = converStringsToNumbers(jobEntryId);
        const deletedJobEntry = await prisma.jobEntry.delete({
            where: {
                id: parsedJobEntryId,
                ownerid: id,
            },
        });
        const response = {
            data: {
                message: `${deletedJobEntry.title} has been deleted`,
                status: 201,
            },
        };
        res.status(response.data.status).json(response.data);
    }),
];
const deleteJobEntryMultiple = [
    isAuthorized,
    asyncHandler(async (req, res, next) => {
        const { id } = req.user;
        let ids = req.body;
        ids = ids.map((e) => Number(e));
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new ErrorWithStatusCode("No IDs provided", 400);
        }
        const deleted = await prisma.jobEntry.deleteMany({
            where: {
                id: {
                    in: ids,
                },
                ownerid: req.user.id,
            },
        });
        if (deleted.count === 0) {
            throw new ErrorWithStatusCode("No Entries were deleted!", 400);
        }
        const message = deleted.count === 1 ? "Entry Deleted" : "Entries deleted";
        res.status(200).json({
            data: {
                message,
                status: 200,
                count: deleted.count,
            },
        });
    }),
];
const updateJobEntryController = [
    isAuthorized,
    editJobEntryValidator,
    asyncHandler(async (req, res, next) => {
        const jobEntryId = Number(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
        }
        const { title, company, location, salary, dateapplied, status } = req.body;
        const updatedJobEntry = await prisma.jobEntry.update({
            where: {
                id: jobEntryId,
                ownerid: req.user.id, // Ensure the user is the owner of the job entry
            },
            data: {
                title,
                company: company,
                location,
                salary,
                dateapplied: new Date(dateapplied),
                updatedat: new Date(),
                status: Status[status.toUpperCase()] || Status.APPLIED, // Default to APPLIED if status is not provided
            },
        });
        if (!updatedJobEntry) {
            throw new ErrorWithStatusCode("Job entry not found", 404);
        }
        res.status(200).json({
            data: {
                message: "Job entry updated successfully",
                status: 200,
                entry: updatedJobEntry,
            },
        });
    }),
];
const getJobEntriesFromPast30DaysController = [
    isAuthorized,
    asyncHandler(async (req, res, next) => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getDate() - 30);
        const jobEntries = await prisma.jobEntry.findMany({
            where: {
                ownerid: req.user.id,
                createdat: {
                    lte: today,
                    gte: thirtyDaysAgo,
                },
            },
        });
        res.status(200).json({
            data: {
                message: "Job entries fetched succesfully",
                status: 200,
                jobEntries,
            },
        });
    }),
];
const getJobEntriesWithinSpecificDateRangeController = [
    isAuthorized,
    asyncHandler(async (req, res, next) => {
        const startDate = new Date(+req.params.startyear, +req.params.startmonth - 1, // Months are 0-indexed in JavaScript
        +req.params.startday);
        const endDate = new Date(+req.params.endyear, +req.params.endmonth - 1, +req.params.endday);
        if (startDate > endDate) {
            throw new ErrorWithStatusCode("Start date cannot be after end date", 400);
        }
        const jobEntries = await prisma.jobEntry.findMany({
            where: {
                ownerid: req.user.id,
                createdat: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });
        jobEntries.length === 0
            ? res.status(404).json({
                error: {
                    message: "No job entries found for the specified date range",
                    status: 404,
                },
            })
            : res.status(200).json({
                data: {
                    message: "Job entries fetched successfully",
                    status: 200,
                    entries: jobEntries,
                },
            });
    }),
];
const getAllJobEntries = [
    isAuthorized,
    asyncHandler(async (req, res, next) => {
        const jobEntries = await prisma.jobEntry.findMany({
            where: {
                ownerid: req.user.id,
            },
            orderBy: {
                createdat: "desc",
            },
        });
        res.status(200).json({
            data: {
                message: "All job entries fetched successfully",
                status: 200,
                jobEntries,
            },
        });
    }),
];
export { postJobEntryController, deleteJobEntryController, getJobEntriesFromPast30DaysController, getJobEntriesWithinSpecificDateRangeController, getAllJobEntries, deleteJobEntryMultiple, updateJobEntryController, };
