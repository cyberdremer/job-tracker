import { Router } from "express";
const oauthRouter = Router();
import {
  googleSignupController,
  googleLoginController,
} from "../controllers/google.js";
oauthRouter.get("/google", googleSignupController);
oauthRouter.get("/google/callback", googleLoginController);

export default oauthRouter;
