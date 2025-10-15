import { Router } from "express";
import {
  uploadResumeController,
  deleteResumeController,
  paginatedResumeController,
} from "../controllers/resume";
const resumeRouter = Router();
resumeRouter.get("/", paginatedResumeController);
resumeRouter.post("/upload", uploadResumeController);
resumeRouter.delete("/delete/:resumeId", deleteResumeController);

export default resumeRouter;
