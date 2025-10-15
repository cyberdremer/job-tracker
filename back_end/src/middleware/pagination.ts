import { Request, Response, NextFunction, RequestHandler } from "express";

export const paginationMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultLimit = 10;
  const maxLimit = 100;
  const defaultMode = "offset";
  const { limit, page, cursor, mode } = req.query;

  if (mode && mode !== "cursor" && mode !== "offset") {
    next(Error("Invalid pagination mode"));
  }

  let parsedLimit = Number(limit) || defaultLimit;
  if (parsedLimit > maxLimit) {
    parsedLimit = maxLimit;
  }
  if (parsedLimit < 1) {
    parsedLimit = defaultLimit;
  }

  let decodedCursor: number | undefined;
  if (cursor && typeof cursor === "string") {
    try {
      const decoded = Buffer.from(cursor, "base64").toString("utf-8");
      decodedCursor = Number(decoded);
    } catch (error) {
      next(Error("Invalid Cursor"));
    }
  }

  req.pagination = {
    limit: parsedLimit,
    cursor: decodedCursor || undefined,
    page: page ? Number(page) : undefined,
    mode: (mode as "cursor" | "offset") || defaultMode,
  };

  next();
};
