import { RequestHandler, Response, Request, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import prisma from "../config/prisma";
import {
  computeCosineSimilarity,
  computeTopKSimilarities,
} from "@prisma/client/sql";
import ErrorWithStatusCode from "../errors/errorstatus";
import { SuccessfullServerResponse } from "../interfaces/serverresponses";
import { converStringsToNumbers } from "../util/isnumber";
import { JobEntry, Resume, ResumeJobFeedback } from "@prisma/client";

const computeScoreController: RequestHandler[] = [
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { resumeId, jobEntryId } = req.params;
    const { id } = req.user;

    const [numberResumeId, numberJobEntryId] = converStringsToNumbers(
      resumeId,
      jobEntryId
    );

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

    const results = await prisma.$queryRawTyped(
      computeCosineSimilarity(Number(jobEntryId), Number(resumeId))
    );

    const feedback: ResumeJobFeedback = await prisma.resumeJobFeedback.create({
      data: {
        ownerid: id,
        rating: results[0].similarity_score ?? 0,
        name: `${resume.name}-${jobEntry.company}-${jobEntry.title}`,
        resumeid: numberResumeId,
        jobEntryId: numberJobEntryId,
      },
    });

    const response: SuccessfullServerResponse<{ name: string; score: number }> =
      {
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

const computeTopKSimilarResumesControllers: RequestHandler[] = [
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { resumeId } = req.params;
    const { id } = req.user;

    const items: computeTopKSimilarities.Result[] = await prisma.$queryRawTyped(
      computeTopKSimilarities(Number(resumeId), 5)
    );

    if (items.length === 0) {
      throw new ErrorWithStatusCode("No entries found", 404);
    }

    const response: SuccessfullServerResponse<
      computeTopKSimilarities.Result[]
    > = {
      data: {
        message: "Job Entries that are most fit your resume have been found",
        status: 200,
        object: items,
      },
    };

    res.status(response.data.status).json(response.data);
  }),
];

const deleteFeedbackController: RequestHandler[] = [
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

    const response: SuccessfullServerResponse<{}> = {
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

export {
  computeScoreController,
  deleteFeedbackController,
  computeTopKSimilarResumesControllers,
};
