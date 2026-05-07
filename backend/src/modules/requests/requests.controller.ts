import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import {
  acceptRequest,
  createRequest,
  findRequest,
  listRequests,
  updateRequestStatus,
} from "./requests.service";

export async function getRequests(_req: Request, res: Response) {
  return sendSuccess(res, listRequests(), "Requests fetched.");
}

export async function getRequest(req: Request, res: Response) {
  return sendSuccess(res, findRequest(String(req.params.requestId)), "Request fetched.");
}

export async function postRequest(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(res, await createRequest(req.user.id, req.body), "Request created.", 201);
}

export async function accept(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(
    res,
    await acceptRequest(String(req.params.requestId), req.user.id),
    "Request accepted.",
  );
}

export async function patchStatus(req: Request, res: Response) {
  return sendSuccess(
    res,
    await updateRequestStatus(String(req.params.requestId), req.body.status),
    "Request status updated.",
  );
}
