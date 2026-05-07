import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { verifyAccessToken } from "../utils/jwt";
import type { Role } from "../types/domain";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(new AppError(401, "Missing Bearer token."));
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role as Role,
    };
    return next();
  } catch {
    return next(new AppError(401, "Invalid or expired token."));
  }
}

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "Authentication required."));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "Insufficient role permissions."));
    }

    return next();
  };
}
