import { Router } from "express";
const topLevelRouter = Router();
import signUpRouter from "./signup.js";
import loginRouter from "./login.js";
import entriesRouter from "./jobentries.js";

topLevelRouter.use("/signup", signUpRouter);
topLevelRouter.use("/login", loginRouter);
topLevelRouter.use("/entry", entriesRouter);
export default topLevelRouter;
