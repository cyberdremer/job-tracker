import { Router } from "express";
const signUpRouter = Router();
import { signUpController } from "../controllers/signup.js";

signUpRouter.post("/local", signUpController);
signUpRouter.post("/google", () => {});

export default signUpRouter;
