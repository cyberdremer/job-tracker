import { Router } from "express";
import { deleteFeedbackController, } from "../controllers/scoring.js";
const scoreRouter = Router();
scoreRouter.post("/resume/:resumeId");
scoreRouter.post("/resume/:resumeId/jobentry/:jobEntryId");
scoreRouter.delete("/resume/:resumeId", deleteFeedbackController);
export default scoreRouter;
