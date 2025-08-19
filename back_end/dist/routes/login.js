import { Router } from "express";
const loginRouter = Router();
import { localLoginController } from "../controllers/login.js";
loginRouter.post("/local", localLoginController);
loginRouter.post("/google", () => { });
export default loginRouter;
