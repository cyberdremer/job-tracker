import { Router } from "express";
const topLevelRouter = Router();
import signUpRouter from "./signup";
import resumeRouter from "./resume";
import loginRouter from "./login";
import entriesRouter from "./jobentries";
import authenticateRouter from "./authenticate";
import oauthRouter from "./oauth";
import logoutRouter from "./logout";

topLevelRouter.use("/signup", signUpRouter);
topLevelRouter.use("/login", loginRouter);
topLevelRouter.use("/entry", entriesRouter);
topLevelRouter.use("/oauth", oauthRouter);
topLevelRouter.use("/auth", authenticateRouter);
topLevelRouter.use("/logout", logoutRouter);
topLevelRouter.use("/resume", resumeRouter);
export default topLevelRouter;
