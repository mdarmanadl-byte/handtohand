import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/api-response";
import { getUserProfile, listUsers } from "./users.service";

export async function getUsers(_req: Request, res: Response) {
  return sendSuccess(res, listUsers(), "Users fetched.");
}

export async function getUser(req: Request, res: Response) {
  return sendSuccess(res, getUserProfile(String(req.params.userId)), "User fetched.");
}
