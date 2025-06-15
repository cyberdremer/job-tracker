import { Router } from "express";
import authenticateController from "../controllers/authenticate.js";
const authenticateRouter = Router();

authenticateRouter.get("/verify", authenticateController);


export default authenticateRouter
