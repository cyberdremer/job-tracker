import { CloudStorage } from "../classes/cloudstorage.js";
import "dotenv/config";
import { CloudStorageStrategy } from "../interfaces/cloud.js";
import { CloudinaryStrategy } from "./cloudinary.js";

let cloudStorageProvider: CloudStorageStrategy;

cloudStorageProvider = new CloudinaryStrategy();

const cloudStorageUploader = new CloudStorage(cloudStorageProvider)

export default cloudStorageUploader
