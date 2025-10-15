import { CloudStorage } from "../classes/cloudstorage";
import "dotenv/config";
import { CloudStorageStrategy } from "../interfaces/cloud";
import { CloudinaryStrategy } from "./cloudinary";

let cloudStorageProvider: CloudStorageStrategy;

cloudStorageProvider = new CloudinaryStrategy();

const cloudStorageUploader = new CloudStorage(cloudStorageProvider)

export default cloudStorageUploader
