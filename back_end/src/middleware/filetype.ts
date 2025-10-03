import { fileTypeFromBuffer } from "file-type";
import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import { acceptedTypes } from "../config/multer";
import ErrorWithStatusCode from "../errors/errorstatus";
// Second check using magic numbers, not able to do this until multer has processed the file
export const verifyFileType: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      next(new ErrorWithStatusCode("Empty file field!", 401));
    }
    const fileType = await fileTypeFromBuffer(req.file.buffer);
    if (!fileType || !acceptedTypes.has(fileType?.mime)) {
      next(new ErrorWithStatusCode("Invalid media type", 422));
    }
    next();
  }
);
