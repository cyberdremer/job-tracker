import asyncHandler from "express-async-handler";
import { loginValidator } from "../validator/validator.js";
import { validationResult } from "express-validator";
import ErrorWithStatusCode from "../errors/errorstatus.js";
import passport from "passport";

const localLoginController = [
  loginValidator,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0], 400);
    }

    passport.authenticate("local", { session: true }, (err, user, info) => {
      if (err) {
        return next(new ErrorWithStatusCode(err.msg, 500));
      }
      if (!user) {
        return next(new ErrorWithStatusCode("Invalid Credentials", 400));
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          data: {
            message: "Login Succesull",
            status: 200,
            user: {
              fullname: user.fullname,
            },
          },
        });
      });
    });
  }),
];

const googleLoginController = [
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0], 400);
    }
    passport.authenticate("google", { session: true }, (err, user, info) => {
      if (err) {
        return next(new ErrorWithStatusCode(err.msg, 500));
      }
      if (!user) {
        return next(new ErrorWithStatusCode("Invalid Credentials", 400));
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          message: "Login Succesfull",
          status: 200,
        });
      });
    });
  }),
];

export  { localLoginController, googleLoginController };
