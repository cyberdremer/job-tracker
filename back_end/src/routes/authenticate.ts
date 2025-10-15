import { Router } from "express";
import authenticateController from "../controllers/authenticate";
const authenticateRouter = Router();

authenticateRouter.get("/verify", authenticateController);


export default authenticateRouter
