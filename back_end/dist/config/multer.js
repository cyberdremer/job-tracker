import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
const storage = multer.memoryStorage();
var AcceptedMimeTypes;
(function (AcceptedMimeTypes) {
    AcceptedMimeTypes["TEXT"] = "text/plain";
    AcceptedMimeTypes["PDF"] = "application/pdf";
    AcceptedMimeTypes["DOC"] = "application/msword";
    AcceptedMimeTypes["DOCX"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
})(AcceptedMimeTypes || (AcceptedMimeTypes = {}));
const acceptedTypes = new Set(Object.values(AcceptedMimeTypes));
const fileFilter = async (req, file, callback) => {
    if (!req.file) {
        throw new Error("No file attached to request object");
    }
    const fileType = await fileTypeFromBuffer(req.file.buffer);
    if (!fileType) {
        return callback(new Error("Error in reading buffer"));
    }
    if (!acceptedTypes.has(fileType.mime)) {
        return callback(new Error("Unsupported File type"));
    }
    if (req.file.size > fileLimits.fileSize) {
        return callback(new Error("File is too large"));
    }
    callback(null, true);
};
const fileLimits = {
    fileSize: 6 * 1024,
    files: 1,
};
const upload = multer({
    fileFilter: fileFilter,
    limits: fileLimits,
});
export default upload;
