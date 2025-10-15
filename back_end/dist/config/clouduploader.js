import { CloudStorage } from "../classes/cloudstorage.js";
import "dotenv/config";
import { CloudinaryStrategy } from "./cloudinary.js";
let cloudStorageProvider;
cloudStorageProvider = new CloudinaryStrategy();
const cloudStorageUploader = new CloudStorage(cloudStorageProvider);
export default cloudStorageUploader;
