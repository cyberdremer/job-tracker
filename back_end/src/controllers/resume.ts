import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";
import { RequestHandler, Request, Response, NextFunction } from "express";
import upload from "../config/multer.js";
import cloudStorageUploader from "../config/clouduploader.js";
import ErrorWithStatusCode from "../errors/errorstatus.js";
import {
  ResumeFiltered,
  SuccessfullServerResponse,
} from "../interfaces/serverresponses.js";
import { paginationMiddleware } from "../middleware/pagination.js";

import pgvector from "pgvector";
import pdfParse from "pdf-parse";
import { insertEmbeddingIntoTable } from "../util/embedding.js";
import { resolve } from "path";
import {
  PaginatedResults,
  PaginationOptions,
  PaginationStrategyInterface,
} from "../interfaces/pagination.js";
import { createPaginationContext } from "../classes/pagination.js";
import { Resume } from "@prisma/client";
import isAuthorized from "../middleware/authorized.js";

const uploadResumeController: RequestHandler[] = [
  upload.single("resume"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { file, user } = req;
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
        ownerid: id,
        originalfilename: file.originalname,
        name: file.filename,
        cloudinarylink: uploadResult.url,
        cloudinarypublicid: uploadResult.publicId,
        filesize: file.size,
        mimetype: file.mimetype,
      },
    });

    const { text } = await pdfParse(file.buffer);
    const insertResult = await insertEmbeddingIntoTable(
      text,
      "Resume",
      uploadedResume.id
    );

    const response: SuccessfullServerResponse = {
      data: {
        message: `${file.filename} has been successfully uploaded`,
        status: 200,
        object: undefined,
      },
    };

    res.status(response.data.status).json(response.data);
  }),
];

const deleteResumeController: RequestHandler[] = [
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { resumeId } = req.params;
    const { id } = req.user;

    const deletedResume = await prisma.resume.delete({
      where: {
        ownerid: id,
        id: Number(resumeId),
      },
    });

    const response: SuccessfullServerResponse = {
      data: {
        message: `${deletedResume.name} has been deleted`,
        status: 200,
        object: undefined,
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
    let options: PaginationOptions;
    switch (mode) {
      case "cursor":
        options = {
          limit: limit,
          ownerid: id,
          cursor: cursor,
        };

      case "offset":
        options = {
          limit: limit,
          ownerid: id,
          page: page,
        };
    }

    paginationContext = createPaginationContext<Resume>(mode);
    queryResults = await paginationContext.paginate(prisma.resume, options);
    const filteredResults: ResumeFiltered[] = queryResults.data.map(
      ({
        id,
        name,
        uploadedat,
        cloudinarylink,
        cloudinarypublicid,
        lastmodified,
      }) => {
        return {
          id,
          name,
          lastModified: new Date(lastmodified),
          uploadedAt: new Date(uploadedat),
          cloudinaryLink: cloudinarylink,
          cloudinaryPublicId: cloudinarypublicid,
        };
      }
    );

    const paginatedResults: PaginatedResults<ResumeFiltered> = {
      data: filteredResults,
      nextCursor: queryResults.nextCursor,
      totalCount: queryResults.totalCount,
    };


  }),
];

export { uploadResumeController, deleteResumeController };
