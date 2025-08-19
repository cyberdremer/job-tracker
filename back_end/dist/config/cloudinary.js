import { v2 as cloudinary, } from "cloudinary";
import ErrorWithStatusCode from "../errors/errorstatus.js";
export class CloudinaryStrategy {
    constructor() {
        cloudinary.config({});
    }
    async deleteFile(publicId) {
        const deleteRespones = await cloudinary.uploader.destroy(publicId);
    }
    async uploadFile(file, filename) {
        try {
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream((error, uploadResult) => {
                    if (error) {
                        return reject(error);
                    }
                    if (!uploadResult) {
                        return reject(new Error("Upload result is undefined"));
                    }
                    return resolve(uploadResult);
                })
                    .end(file);
            });
            return {
                url: uploadResult.url,
                publicId: uploadResult.publicId,
            };
        }
        catch (error) {
            throw new ErrorWithStatusCode("Error with uploading file", 400);
        }
    }
}
