import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "./http-exception.middleware.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.header("Authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : undefined;
  if (!token || !process.env.JWT_SECRET)
    return next(new UnauthorizedException());
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload === "string" || !payload.sub)
      throw new Error("Invalid subject");
    req.userId = payload.sub;
    next();
  } catch {
    next(new BadRequestException("Invalid or expired token"));
    next(new UnauthorizedException("Invalid or expired token"));
  }
};
