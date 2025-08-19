import passport from "../config/passport.js";
import asyncHandler from "express-async-handler";
import ErrorWithStatusCode from "../errors/errorstatus.js";
import frontendUrl from "../util/frontend.js";

const googleSignupController = asyncHandler(async (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});

const googleLoginController = asyncHandler(async (req, res, next) => {
  passport.authenticate("google", { session: true }, (err, user, info) => {
    if (err) {
      return next(new ErrorWithStatusCode(err.msg, 500));
    }
    if (!user) {
      return next(new ErrorWithStatusCode("Invalid Credentials", 401));
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`${frontendUrl}/dashboard`);
    });
  })(req, res, next);
});

export { googleSignupController, googleLoginController };
