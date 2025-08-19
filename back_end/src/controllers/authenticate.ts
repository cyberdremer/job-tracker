import asyncHandler from "express-async-handler";
import isAuthorized from "../middleware/authorized.js";
import { RequestHandler, Request, Response, NextFunction } from "express";

const authenticateController: RequestHandler[] = [
  isAuthorized,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
      data: {
        message: "You are authenticated!",
        status: 201,
        user: {
          fullname: req.user.fullname,
          email: req.user.email,
        },
      },
    });
  }),
];

export default authenticateController
