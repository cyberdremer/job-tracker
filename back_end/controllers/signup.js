import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { signUpValidator } from "../validator/validator.js";
import bcrypt from "bcryptjs";
import ErrorWithStatusCode from "../errors/errorstatus.js";
import prisma from "../config/prisma.js";
import passport from "passport";

const signUpController = [
  signUpValidator,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 401);
    }
    const passwordhash = await bcrypt.hash(req.body.password, 16);
    const user = await prisma.user.create({
      data: {
        fullname: req.body.firstname + "" + req.body.lastname,
        email: req.body.email,
        passwordhash: passwordhash,
      },
    });

    res.status(201).json({
      data: {
        message: "Account succesfully created",
        status: 201,
      },
    });
  }),
];

const googleSignUpController = [
  asyncHandler(async (req, res, next) => {
    passport.authenticate("google", {
      scope: ["profile"],
    })(req, res, next);
  }),
];

export { signUpController, googleSignUpController };
