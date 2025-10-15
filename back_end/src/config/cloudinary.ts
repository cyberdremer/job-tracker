import {
  v2 as cloudinary,
  DeleteApiResponse,
  UploadApiResponse,
} from "cloudinary";
import { CloudStorageStrategy, UploadFileResponse } from "../interfaces/cloud";
import { resolve } from "path";
import { rejects } from "assert";
import { error } from "console";
import ErrorWithStatusCode from "../errors/errorstatus";

export class CloudinaryStrategy implements CloudStorageStrategy {
  constructor() {
    cloudinary.config({});
  }
  async deleteFile(publicId: string): Promise<void> {
    const deleteRespones: DeleteApiResponse = await cloudinary.uploader.destroy(
      publicId
    );
  }

  async uploadFile(
    file: Buffer,
    filename: string
  ): Promise<UploadFileResponse> {
    try {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
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
        }
      );

      return {
        url: uploadResult.url,
        publicId: uploadResult.public_id,
      };
    } catch (error) {
      throw new ErrorWithStatusCode("Error with uploading file", 400);
    }
  }
}
