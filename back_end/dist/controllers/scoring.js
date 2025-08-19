import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";
import { computeCosineSimilarity, computeTopKSimilarities, } from "@prisma/client/sql";
import ErrorWithStatusCode from "../errors/errorstatus.js";
import { converStringsToNumbers } from "../util/isnumber.js";
const computeScoreController = [
    asyncHandler(async (req, res, next) => {
        const { resumeId, jobEntryId } = req.params;
        const { id } = req.user;
        const [numberResumeId, numberJobEntryId] = converStringsToNumbers(resumeId, jobEntryId);
        const [resume, jobEntry] = await Promise.all([
            prisma.resume.findFirstOrThrow({
                where: {
                    id: numberResumeId,
                    ownerid: id,
                },
                select: {
                    name: true,
                    id: true,
                },
            }),
            prisma.jobEntry.findFirstOrThrow({
                where: {
                    id: numberJobEntryId,
                    ownerid: id,
                },
                select: {
                    title: true,
                    company: true,
                    id: true,
                },
            }),
        ]).catch((err) => {
            throw err;
        });
        const results = await prisma.$queryRawTyped(computeCosineSimilarity(Number(jobEntryId), Number(resumeId)));
        const feedback = await prisma.resumeJobFeedback.create({
            data: {
                ownerid: id,
                rating: results[0].similarity_score ?? 0,
                name: `${resume.name}-${jobEntry.company}-${jobEntry.title}`,
                resumeid: numberResumeId,
                jobEntryId: numberJobEntryId,
            },
        });
        const response = {
            data: {
                message: `${resume.name} has been succesfully rated`,
                status: 200,
                object: {
                    name: feedback.name,
                    score: feedback.rating,
                },
            },
        };
        res.status(response.data.status).json(response.data);
    }),
];
const computeTopKSimilarResumesControllers = [
    asyncHandler(async (req, res, next) => {
        const { resumeId } = req.params;
        const { id } = req.user;
        const items = await prisma.$queryRawTyped(computeTopKSimilarities(Number(resumeId), 5));
        if (items.length === 0) {
            throw new ErrorWithStatusCode("No entries found", 404);
        }
        const response = {
            data: {
                message: "Job Entries that are most fit your resume have been found",
                status: 200,
                object: items,
            },
        };
        res.status(response.data.status).json(response.data);
    }),
];
const deleteFeedbackController = [
    asyncHandler(async (req, res, next) => {
        const { feedbackId } = req.params;
        const { id } = req.user;
        const [numberFeedbackId] = converStringsToNumbers(feedbackId);
        const deletedFeedback = await prisma.resumeJobFeedback.delete({
            where: {
                id: numberFeedbackId,
                ownerid: id,
            },
        });
        const response = {
            data: {
                message: `${deletedFeedback.name} has been deleted`,
                status: 201,
                object: {
                    feedbackId: deletedFeedback.id,
                },
            },
        };
    }),
];
export { computeScoreController, deleteFeedbackController, computeTopKSimilarResumesControllers, };
