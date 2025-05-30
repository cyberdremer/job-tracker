import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { jobEntryValidator } from "../validator/validator";
import prisma from "../config/prisma";
import ErrorWithStatusCode from "../errors/errorstatus";
import isAuthorized from "../middleware/authorized.js";

const postJobEntryController = [
  isAuthorized,
  jobEntryValidator,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 401);
    }
    const { title, description, company, location, salary, status } = req.body;
    await prisma.jobEntry.create({
      data: {
        ownerid: req.user.id,
        title,
        description,
        company,
        location,
        salary: parseFloat(salary),
        status: status || "APPLYING"
      },
    });

    res.status(201).json({
      data: {
        message: "Job entry created successfully",
        status: 201,
      },
    });
  }),
];

const deleteJobEntryController = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const jobEntryId = Number(req.params.id);
    const deleted = await prisma.jobEntry.delete({
      where: {
        id: jobEntryId,
        ownerid: req.user.id, // Ensure the user is the owner of the job entry
      },
    });
    if (!deleted) {
      throw new ErrorWithStatusCode("Job entry not found", 404);
    }
    res.status(204).json({
      data: {
        message: "Job entry deleted successfully",
        status: 204,
      },
    });
  }),
];

const updateJobEntryController = [
  isAuthorized,
  jobEntryValidator,
  asyncHandler(async (req, res, next) => {
    const jobEntryId = Number(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 401);
    }
    const { title, description, company, location, salary } = req.body;
    const updatedJobEntry = await prisma.jobEntry.update({
      where: {
        id: jobEntryId,
        ownerid: req.user.id, // Ensure the user is the owner of the job entry
      },
      data: {
        title,
        description,
        company,
        location,
        salary: parseFloat(salary),
      },
    });
    if (!updatedJobEntry) {
      throw new ErrorWithStatusCode("Job entry not found", 404);
    }
    res.status(200).json({
      data: {
        message: "Job entry updated successfully",
        status: 200,
        jobEntry: updatedJobEntry,
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
    const startDate = new Date(
      +req.query.startYear,
      +req.query.startMonth - 1, // Months are 0-indexed in JavaScript
      +req.query.startDay
    );

    const endDate = new Date(
      +req.query.endYear,
      +req.query.endMonth - 1,
      +req.query.endDay
    );

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
            jobEntries,
          },
        });
  }),
];

const getAllJobEntriesForDataVisualizationController = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const jobEntries = await prisma.jobEntry.findMany({
      where: {
        ownerid: req.user.id,
      },
      select: {
        status: true,
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

export {
  postJobEntryController,
  deleteJobEntryController,
  getJobEntriesFromPast30DaysController,
  getJobEntriesWithinSpecificDateRangeController,
  getAllJobEntriesController,
  getAllJobEntriesForDataVisualizationController,
};
