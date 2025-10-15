import asyncHandler from "express-async-handler";
import { loginValidator } from "../validator/validator";
import { validationResult } from "express-validator";
import { DeserializedUser } from "../interfaces/user";
import ErrorWithStatusCode from "../errors/errorstatus";
import passport from "passport";
import { RequestHandler } from "express";




const localLoginController: RequestHandler[] = [
  loginValidator,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 401);
    }

    passport.authenticate(
      "local",
      { session: true },
      (err: any, user: DeserializedUser) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new ErrorWithStatusCode("Invalid Credentials", 401));
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          res.status(200).json({
            data: {
              message: "Login Successful",
              status: 200,
              user: {
                fullname: user.fullname,
                
              },
            },
          });
        });
      }
    )(req, res, next);
  }),
];

const googleLoginController: RequestHandler[] = [
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 401);
    }
    passport.authenticate("google", { session: true }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new ErrorWithStatusCode("Invalid Credentials", 401));
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
    })(req, res, next);
  }),
];

export { localLoginController, googleLoginController };
