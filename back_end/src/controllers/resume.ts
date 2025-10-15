import asyncHandler from "express-async-handler";
import prisma from "../config/prisma";
import { RequestHandler, Request, Response, NextFunction } from "express";
import upload from "../config/multer";
import cloudStorageUploader from "../config/clouduploader";
import ErrorWithStatusCode from "../errors/errorstatus";
import {
  ResumeFiltered,
  SuccessfullServerResponse,
} from "../interfaces/serverresponses";
import { paginationMiddleware } from "../middleware/pagination";

import pdfParse from "pdf-parse";
import { insertEmbeddingIntoTable } from "../util/embedding";
import {
  PaginatedResults,
  PaginationOptions,
  PaginationStrategyInterface,
} from "../interfaces/pagination";
import aiServicesProvider from "../config/aiprovider";
import { createPaginationContext } from "../classes/pagination";
import { Prisma, Resume } from "@prisma/client";
import isAuthorized from "../middleware/authorized";
import { verifyFileType } from "../middleware/filetype";
import { ResumeResponse } from "../types/resume";

const uploadResumeController: RequestHandler[] = [
  isAuthorized,
  upload.single("resume"),
  verifyFileType,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { file } = req;
    const { id } = req.user;
    if (!file) {
      throw new ErrorWithStatusCode("File not attached to request body", 404);
    }
    const uploadResult = await cloudStorageUploader.uploadFile(
      file.buffer,
      file.filename
    );

    const uploadedResume = await prisma.resume.create({
      data: {
        name: file.originalname,
        ownerid: id,
        originalfilename: file.originalname,
        cloudinarylink: uploadResult.url,
        cloudinarypublicid: uploadResult.publicId,
        filesize: file.size,
        mimetype: file.mimetype,
      },
    });

    const { text } = await pdfParse(file.buffer);
    const embedding = await aiServicesProvider.generateEmbedding(text);
    const insertResult = await insertEmbeddingIntoTable(
      embedding,
      "Resume",
      uploadedResume.id
    );

    const resumeResponse: ResumeResponse = {
      resumeCore: {
        resumeId: uploadedResume.id,
        fileName: uploadedResume.originalfilename,
      },
      resumeMeta: {
        mimeType: uploadedResume.mimetype,
        size: uploadedResume.filesize,
        uploadedAt: uploadedResume.uploadedat,
      },
      resumeCloudInformation: {
        cloudinaryPublicUrl: uploadedResume.cloudinarylink,
        cloudinaryPublicId: uploadedResume.cloudinarypublicid
      }
      
      // resumeId: uploadedResume.id,
      // uploadedAt: uploadedResume.uploadedat,
      // cloudinaryPublicUrl: uploadedResume.cloudinarylink,
      // cloudinaryPublidId: uploadedResume.cloudinarypublicid,
      // fileName: uploadedResume.originalfilename,
      // mimeType: uploadedResume.mimetype,
      // size: uploadedResume.filesize,
    };

    const response: SuccessfullServerResponse<ResumeResponse> = {
      data: {
        message: `${file.originalname} has been successfully uploaded`,
        status: 200,
        object: resumeResponse,
      },
    };

    res.status(response.data.status).json(response.data);
  }),
];

const deleteResumeController: RequestHandler[] = [
  isAuthorized,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { resumeId } = req.params;
    const { id } = req.user;

    const deletedResume = await prisma.resume.delete({
      where: {
        ownerid: id,
        id: Number(resumeId),
      },
    });

    const deletedResumeResponse: ResumeResponse = {
      resumeCore: {
        resumeId: deletedResume.id,
        fileName: deletedResume.originalfilename,
      }
    };

    const response: SuccessfullServerResponse<ResumeResponse> = {
      data: {
        message: `${deletedResume.name} has been deleted`,
        status: 200,
        object: deletedResumeResponse,
      },
    };

    res.status(response.data.status).json(response.data);
  }),
];

const paginatedResumeController: RequestHandler[] = [
  isAuthorized,
  paginationMiddleware,
  asyncHandler(async (req, res, next) => {
    const { mode, page, cursor, limit } = req.pagination!;
    const { id } = req.user;
    let paginationContext: PaginationStrategyInterface<Resume>;
    let queryResults: PaginatedResults<Resume>;
    let selectOptions: Prisma.ResumeSelect = {
      id: true,
      name: true,
      cloudinarylink: true,
      cloudinarypublicid: true,
      mimetype: true,
      filesize: true,
      uploadedat: true,
      lastmodified: true,
    };
    let options: PaginationOptions<Prisma.ResumeSelect>;

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

    paginationContext = createPaginationContext<Resume>(mode);
    queryResults = await paginationContext.paginate(prisma.resume, options);

    const paginatedResults: PaginatedResults<ResumeFiltered> = {
      results: queryResults.results,
      nextCursor: queryResults.nextCursor,
      offset: queryResults.offset,
    };

    const response: SuccessfullServerResponse<
      PaginatedResults<ResumeFiltered>
    > = {
      data: {
        message: "Resumes have been fetched!",
        status: 200,
        object: paginatedResults,
      },
    };

    res.status(response.data.status).json(response.data.object);
  }),
];

export {
  uploadResumeController,
  deleteResumeController,
  paginatedResumeController,
};
