export type UploadFileResponse = {
  url: string,
  publicId: string,
}


export interface CloudStorageStrategy {
  uploadFile(
    file: Buffer,
    filename: string
  ): Promise<UploadFileResponse>;
  deleteFile(publicId: string): Promise<void>;
}
