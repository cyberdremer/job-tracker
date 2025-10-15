import asyncHandler from "express-async-handler";
import prisma from "../config/prisma.js";
import upload from "../config/multer.js";
import cloudStorageUploader from "../config/clouduploader.js";
import ErrorWithStatusCode from "../errors/errorstatus.js";
import pdfParse from "pdf-parse";
import { insertEmbeddingIntoTable, } from "../util/embedding.js";
const uploadResumeController = [
    upload.single("resume"),
    asyncHandler(async (req, res, next) => {
        const { file, user } = req;
        const { id } = user;
        if (!file) {
            throw new ErrorWithStatusCode("File not attached to request body", 404);
        }
        const uploadResult = await cloudStorageUploader.uploadFile(file.buffer, file.filename);
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
        const insertResult = await insertEmbeddingIntoTable(text, "Resume", uploadedResume.id);
        const response = {
            data: {
                message: `${file.filename} has been successfully uploaded`,
                status: 200,
                object: undefined,
            },
        };
        res.status(response.data.status).json(response.data);
    }),
];
const deleteResumeController = [
    asyncHandler(async (req, res, next) => {
        const { resumeId } = req.params;
        const { id } = req.user;
        const deletedResume = await prisma.resume.delete({
            where: {
                ownerid: id,
                id: Number(resumeId),
            },
        });
        const response = {
            data: {
                message: `${deletedResume.name} has been deleted`,
                status: 200,
                object: undefined,
            },
        };
        res.status(response.data.status).json(response.data);
    }),
];
export { uploadResumeController, deleteResumeController };
