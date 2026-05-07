import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import { getRecommendations, processGeofenceEntry } from "./matching.service";

export async function geofenceEntry(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(
    res,
    await processGeofenceEntry(req.user.id, req.body.placeId),
    "Geofence event processed.",
  );
}

export async function recommendations(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(res, getRecommendations(req.user.id), "Recommendations fetched.");
}
