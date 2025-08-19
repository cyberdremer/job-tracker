import { Router } from "express";
const signUpRouter = Router();
import { signUpController } from "../controllers/signup.js";
signUpRouter.post("/local", signUpController);
export default signUpRouter;
