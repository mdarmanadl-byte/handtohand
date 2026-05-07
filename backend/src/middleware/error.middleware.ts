import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { logger } from "../utils/logger";

export function notFoundMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorMiddleware(
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const details = error instanceof AppError ? error.details : undefined;

  if (statusCode >= 500) {
    logger.error(error.message, details);
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    details,
  });
}
