import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { geofenceEntry, recommendations } from "./matching.controller";
import { geofenceSchema } from "./matching.schema";

export const matchingRouter = Router();

matchingRouter.use(requireAuth);
matchingRouter.post("/geofence-entry", validate({ body: geofenceSchema }), asyncHandler(geofenceEntry));
matchingRouter.get("/recommendations", asyncHandler(recommendations));
