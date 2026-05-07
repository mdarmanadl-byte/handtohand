import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { accept, getRequest, getRequests, patchStatus, postRequest } from "./requests.controller";
import { createRequestSchema, updateRequestStatusSchema } from "./requests.schema";

export const requestsRouter = Router();

requestsRouter.get("/", asyncHandler(getRequests));
requestsRouter.get("/:requestId", asyncHandler(getRequest));
requestsRouter.post("/", requireAuth, validate({ body: createRequestSchema }), asyncHandler(postRequest));
requestsRouter.post("/:requestId/accept", requireAuth, asyncHandler(accept));
requestsRouter.patch(
  "/:requestId/status",
  requireAuth,
  validate({ body: updateRequestStatusSchema }),
  asyncHandler(patchStatus),
);
