import { RequestHandler, Request, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

import { fileTypeFromBuffer } from "file-type";
import ErrorWithStatusCode from "../errors/errorstatus";

enum AcceptedMimeTypes {
  TEXT = "text/plain",
  PDF = "application/pdf",
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

export const acceptedTypes: Set<string> = new Set(
  Object.values(AcceptedMimeTypes)
);
const fileLimits = {
  fileSize: 10 * 1024 * 1024,
  files: 1,
};
const storage = multer.memoryStorage();
const fileFilter = async (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  try {
    const fileType = file.mimetype;
    if (!fileType) {
      return callback(new Error("Error in reading buffer"));
    }
    if (!acceptedTypes.has(fileType)) {
      return callback(new ErrorWithStatusCode("Unsupported File type", 422));
    }
    if (file.size > fileLimits.fileSize) {
      return callback(new ErrorWithStatusCode("File is too large", 413));
    }
    callback(null, true);
  } catch (error) {
    callback(error as Error);
  }
};

const upload: multer.Multer = multer({
  fileFilter: fileFilter,
  limits: fileLimits,
  storage,
});

export default upload;
