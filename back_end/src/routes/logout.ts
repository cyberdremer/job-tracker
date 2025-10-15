import { Router } from "express";
import logoutController from "../controllers/logout";
const logoutRouter = Router();

logoutRouter.post("/", logoutController);


export default logoutRouter
