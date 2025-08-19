import { Router } from "express";
import { uploadResumeController, deleteResumeController, } from "../controllers/resume.js";
const resumeRouter = Router();
resumeRouter.post("/upload", uploadResumeController);
resumeRouter.delete("/delete", deleteResumeController);
export default resumeRouter;
