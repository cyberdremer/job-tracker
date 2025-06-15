import asyncHandler from "express-async-handler";
import isAuthorized from "../middleware/authorized.js";
const authenticateController = [
  isAuthorized,
  asyncHandler(async (req, res, next) => {
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
