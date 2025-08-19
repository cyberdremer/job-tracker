import { CloudStorageStrategy } from "../interfaces/cloud.js";

export class CloudStorage {
  private strategy: CloudStorageStrategy;

  constructor(strategy: CloudStorageStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: CloudStorage) {
    this.strategy = strategy;
  }

  async uploadFile(file: Buffer, publicId: string) {
    return this.strategy.uploadFile(file, publicId);
  }

  async deleteFile(publicId: string) {
    return this.strategy.deleteFile(publicId);
  }
}
