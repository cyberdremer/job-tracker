import { Router } from "express";
const entriesRouter = Router();
import {
  postJobEntryController,
  deleteJobEntryMultiple,
  updateJobEntryController,
  getJobEntriesWithinSpecificDateRangeController,
  getJobEntriesFromPast30DaysController,
} from "../controllers/jobentries.js";

entriesRouter.post("/create", postJobEntryController);
entriesRouter.delete("/delete", deleteJobEntryMultiple);
entriesRouter.put("/update", updateJobEntryController);
entriesRouter.get(
  "/retrieve/past-thirty-days",
  getJobEntriesFromPast30DaysController
);
entriesRouter.get(
  "/retrieve/:startmonth-:startday-:startyear-:endmonth-:endday-:endyear",
  getJobEntriesWithinSpecificDateRangeController
);


export default entriesRouter
