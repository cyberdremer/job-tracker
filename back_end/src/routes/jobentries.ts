import { Router } from "express";
const entriesRouter = Router();
import {
  postJobEntryController,
  deleteJobEntryController,
  deleteJobEntryMultiple,
  updateJobEntryController,
  getJobEntriesWithinSpecificDateRangeController,
  getJobEntriesFromPast30DaysController,
  getAllJobEntries,
} from "../controllers/jobentries.js";

entriesRouter.post("/create", postJobEntryController);
entriesRouter.delete("/delete", deleteJobEntryMultiple);
entriesRouter.delete("/delete/:jobEntryId", deleteJobEntryController)
entriesRouter.put("/update/:id", updateJobEntryController);
entriesRouter.get("/retrieve/all", getAllJobEntries);
entriesRouter.get(
  "/retrieve/past-thirty-days",
  getJobEntriesFromPast30DaysController
);
entriesRouter.get(
  "/retrieve/:startmonth-:startday-:startyear-:endmonth-:endday-:endyear",
  getJobEntriesWithinSpecificDateRangeController
);

export default entriesRouter;
