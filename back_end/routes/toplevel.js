import { Router } from "express";
const topLevelRouter = Router();
import signUpRouter from "./signup.js";
import loginRouter from "./login.js";

topLevelRouter.use("/signup", signUpRouter);
topLevelRouter.use("/login", loginRouter);

export default topLevelRouter;
