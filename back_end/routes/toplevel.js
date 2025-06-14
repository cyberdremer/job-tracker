import { Router } from "express";
const topLevelRouter = Router();
import signUpRouter from "./signup.js";
import loginRouter from "./login.js";
import entriesRouter from "./jobentries.js";
import authenticateRouter from "./authenticate.js";
import oauthRouter from "./oauth.js";
import logoutRouter from "./logout.js";

topLevelRouter.use("/signup", signUpRouter);
topLevelRouter.use("/login", loginRouter);
topLevelRouter.use("/entry", entriesRouter);
topLevelRouter.use("/oauth", oauthRouter);
topLevelRouter.use("/auth", authenticateRouter);
topLevelRouter.use("/logout", logoutRouter);
export default topLevelRouter;
