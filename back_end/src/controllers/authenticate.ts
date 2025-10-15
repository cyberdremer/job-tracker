import asyncHandler from "express-async-handler";
import isAuthorized from "../middleware/authorized";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { DeserializedUser } from "../interfaces/user";
import { SuccessfullServerResponse } from "../interfaces/serverresponses";

type AuthedUserPII = Pick<DeserializedUser, "fullname" | "email">;

const authenticateController: RequestHandler[] = [
  isAuthorized,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUser: AuthedUserPII = req.user;

    const authenticatedResponse: SuccessfullServerResponse<AuthedUserPII> = {
      data: {
        message: "You are authenticated!",
        status: 201,
        object: authenticatedUser,
      },
    };
    res
      .status(authenticatedResponse.data.status)
      .json(authenticatedResponse.data);
  }),
];

export default authenticateController;
