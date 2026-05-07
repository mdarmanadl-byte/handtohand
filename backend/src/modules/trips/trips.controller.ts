import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import { attachRequestToTrip, createTrip, findTrip, listTrips } from "./trips.service";

export async function getTrips(_req: Request, res: Response) {
  return sendSuccess(res, listTrips(), "Trips fetched.");
}

export async function getTrip(req: Request, res: Response) {
  return sendSuccess(res, findTrip(String(req.params.tripId)), "Trip fetched.");
}

export async function postTrip(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(res, await createTrip(req.user.id, req.body), "Trip created.", 201);
}

export async function attach(req: Request, res: Response) {
  return sendSuccess(
    res,
    await attachRequestToTrip(String(req.params.tripId), req.body.requestId),
    "Request attached to trip.",
  );
}
