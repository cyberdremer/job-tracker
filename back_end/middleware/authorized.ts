import { Request, Response, NextFunction } from "express";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    message: "Unauthorized access",
    status: 401,
  });
};

export default isAuthorized;
