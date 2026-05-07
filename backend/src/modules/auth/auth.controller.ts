import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";

export async function register(req: Request, res: Response) {
  return sendSuccess(res, await registerUser(req.body), "Registration successful.", 201);
}

export async function login(req: Request, res: Response) {
  return sendSuccess(res, await loginUser(req.body), "Login successful.");
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(res, getCurrentUser(req.user.id), "Current user fetched.");
}
