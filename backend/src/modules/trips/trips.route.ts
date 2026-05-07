import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { attach, getTrip, getTrips, postTrip } from "./trips.controller";
import { attachTripRequestSchema, createTripSchema } from "./trips.schema";

export const tripsRouter = Router();

tripsRouter.get("/", asyncHandler(getTrips));
tripsRouter.get("/:tripId", asyncHandler(getTrip));
tripsRouter.post("/", requireAuth, validate({ body: createTripSchema }), asyncHandler(postTrip));
tripsRouter.post(
  "/:tripId/attach-request",
  requireAuth,
  validate({ body: attachTripRequestSchema }),
  asyncHandler(attach),
);
