import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import {
  editJobEntryValidator,
  jobEntryValidator,
} from "../validator/validator";

import ErrorWithStatusCode from "../errors/errorstatus";
import isAuthorized from "../middleware/authorized";
import aiServicesProvider from "../config/aiprovider";
import jobPostingPrompt from "../prompts/prompt";
import { JobEntry, Prisma, Status } from "@prisma/client";
import prisma from "../config/prisma";
import pgvector from "pgvector";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { insertEmbeddingIntoTable } from "../util/embedding";
import { converStringsToNumbers } from "../util/isnumber";
import {
  JobEntryFiltered,
  SuccessfullServerResponse,
} from "../interfaces/serverresponses";
import { resolve } from "path";
import {
  createPaginationContext,
  PaginationContext,
} from "../classes/pagination";
import {
  PaginatedResults,
  PaginationOptions,
  PaginationStrategyInterface,
} from "../interfaces/pagination";
import { paginationMiddleware } from "../middleware/pagination";
import { JobResponse } from "../types/jobs";

const postJobEntryController: RequestHandler[] = [
  isAuthorized,
  jobEntryValidator,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }
    const { description, status, dateapplied, link } = req.body;

    const jobDescriptionPrompt = jobPostingPrompt(description);
    const response = await aiServicesProvider.generateResponse(
      jobDescriptionPrompt
    );

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
        status:
          Status[
            (status as keyof typeof Status).toUpperCase() as keyof typeof Status
          ],
        company: jobDescriptionObject[0].company,
        dateapplied: new Date(dateapplied),
        link: link || "",
        description: description,
      },
    });

    const textEmbedding = await aiServicesProvider.generateEmbedding(
      description
    );
    const sqlTextEmbedding = await pgvector.toSql(textEmbedding);

    const insertResult = await insertEmbeddingIntoTable(
      sqlTextEmbedding,
      "JobEntry",
      entry.id
    );

    const job: JobResponse = {
      job: {
        id: entry.id,
        title: entry.title,
        company: entry.company,
        location: entry.location,
        salary: entry.salary,
        dateapplied: entry.dateapplied,
      },
      meta: {
        description: entry.description || undefined,
        link: entry.link || undefined,
        status: entry.status,
      },
    };

    const jobEntryResponse: SuccessfullServerResponse<JobResponse> = {
      data: {
        message: "Job entry created successfully",
        status: 201,
        object: job,
      },
    };

    res.status(jobEntryResponse.data.status).json(jobEntryResponse.data);
  }),
];

//TODO Delete this function, made redundant by delete multiple entry

const deleteJobEntryController: RequestHandler[] = [
  isAuthorized,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const { jobEntryId } = req.params;

    const [parsedJobEntryId] = converStringsToNumbers(jobEntryId);

    const deletedJobEntry = await prisma.jobEntry.delete({
      where: {
        id: parsedJobEntryId,
        ownerid: id,
      },
    });

    const response: SuccessfullServerResponse = {
      data: {
        message: `${deletedJobEntry.title} has been deleted`,
        status: 201,
      },
    };

    res.status(response.data.status).json(response.data);
  }),
];

const deleteJobEntryMultiple: RequestHandler[] = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    let ids = req.body;
    ids = (ids as (string | number)[]).map((e: string | number) => Number(e));
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new ErrorWithStatusCode("No IDs provided", 400);
    }


    let deletedResponse: JobResponse | JobResponse[] 

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

const updateJobEntryController: RequestHandler[] = [
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
        status:
          Status[
            (status as keyof typeof Status).toUpperCase() as keyof typeof Status
          ] || Status.APPLIED, // Default to APPLIED if status is not provided
      },
    });
    if (!updatedJobEntry) {
      throw new ErrorWithStatusCode("Job entry not found", 404);
    }

    const updatedJobEntryResponse: JobResponse = {
      job: {
        id: updatedJobEntry.id,
        title: updatedJobEntry.title,
        company: updatedJobEntry.company,
        location: updatedJobEntry.location,
        salary: updatedJobEntry.salary,
        dateapplied: updatedJobEntry.dateapplied,
      },
      meta: {
        description: updatedJobEntry.description || undefined,
        link: updatedJobEntry.link || undefined,
        status: updatedJobEntry.status,
      },
    };

    const response: SuccessfullServerResponse<JobResponse> = {
      data: {
        message: "Job entry updated succesfully!",
        status: 200,
        object: updatedJobEntryResponse,
      },
    };

    res.status(response.data.status).json(response.data);
  }),
];

const getJobEntriesFromPast30DaysController: RequestHandler[] = [
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

    const jobInformation: JobResponse[] = jobEntries.map((job) => {
      return {
        job: {
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          dateapplied: job.dateapplied,
        },
        meta: {
          description: job.description || undefined,
          link: job.link || undefined,
          status: job.status,
        },
      };
    });

    const serverResponse: SuccessfullServerResponse<JobResponse[]> = {
      data: {
        message: "Job entries fetched succesfully",
        status: 200,
        object: jobInformation,
      },
    };

    res.status(serverResponse.data.status).json(serverResponse.data);
  }),
];

const getJobEntriesWithinSpecificDateRangeController: RequestHandler[] = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const startDate = new Date(
      +req.params.startyear,
      +req.params.startmonth - 1, // Months are 0-indexed in JavaScript
      +req.params.startday
    );

    const endDate = new Date(
      +req.params.endyear,
      +req.params.endmonth - 1,
      +req.params.endday
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
            entries: jobEntries,
          },
        });
  }),
];

const getAllJobEntries: RequestHandler[] = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
    const jobEntries = await prisma.jobEntry.findMany({
      where: {
        ownerid: req.user.id,
      },
      orderBy: {
        createdat: "desc",
      },
      select: {},
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

const getJobEntriesPaginated: RequestHandler[] = [
  isAuthorized,
  paginationMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { mode, page, cursor, limit } = req.pagination!;
    const { id } = req.user;

    let paginationContext: PaginationStrategyInterface<JobEntry>;
    let queryResults: PaginatedResults<JobEntry>;
    let options: PaginationOptions<Prisma.JobEntrySelect>;
    let selectOptions: Prisma.JobEntrySelect = {
      id: true,
      title: true,
      company: true,
      location: true,
      description: true,
      link: true,
      status: true,
      salary: true,
      dateapplied: true,
    };

    switch (mode) {
      case "cursor":
        options = {
          limit: limit,
          ownerid: id,
          cursor: cursor,
          select: selectOptions,
        };
      case "offset":
        options = {
          limit: limit,
          ownerid: id,
          page: page,
          select: selectOptions,
        };
    }

    paginationContext = createPaginationContext<JobEntry>(mode);
    queryResults = await paginationContext.paginate(prisma.jobEntry, options);

    const jobInformation: JobResponse[] = queryResults.results.map((job) => {
      return {
        job: {
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          dateapplied: job.dateapplied,
        },
        meta: {
          description: job.description || undefined,
          link: job.link || undefined,
          status: job.status,
        },
      };
    });

    const paginatedResults: PaginatedResults<JobResponse> = {
      results: jobInformation,
      nextCursor: queryResults.nextCursor,
      offset: queryResults.offset,
    };

    const response: SuccessfullServerResponse<PaginatedResults<JobResponse>> = {
      data: {
        message: "Job entries have been fetched!",
        status: 200,
        object: paginatedResults,
      },
    };
  }),
];

export {
  postJobEntryController,
  deleteJobEntryController,
  getJobEntriesFromPast30DaysController,
  getJobEntriesWithinSpecificDateRangeController,
  getAllJobEntries,
  deleteJobEntryMultiple,
  updateJobEntryController,
};
