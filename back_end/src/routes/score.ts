import { Router } from "express";
import {
  computeTopKSimilarResumesControllers,
  computeScoreController,
  deleteFeedbackController,
} from "../controllers/scoring";

const scoreRouter = Router();
scoreRouter.post("/resume/:resumeId");
scoreRouter.post("/resume/:resumeId/jobentry/:jobEntryId");
scoreRouter.delete("/resume/:resumeId", deleteFeedbackController);



export default scoreRouter
