export interface CloudStorageStrategy {
  uploadFile(
    file: Buffer,
    filename: string
  ): Promise<{ url: string; publicId: string }>;
  deleteFile(publicId: string): Promise<void>;
}
