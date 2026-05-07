import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { accept, borrow, getItems, postItem, returnItem } from "./borrowables.controller";
import { borrowItemSchema, createItemSchema } from "./borrowables.schema";

export const borrowablesRouter = Router();

borrowablesRouter.get("/", asyncHandler(getItems));
borrowablesRouter.post("/", requireAuth, validate({ body: createItemSchema }), asyncHandler(postItem));
borrowablesRouter.post(
  "/:itemId/borrow",
  requireAuth,
  validate({ body: borrowItemSchema }),
  asyncHandler(borrow),
);
borrowablesRouter.post("/:transactionId/accept", requireAuth, asyncHandler(accept));
borrowablesRouter.post("/:transactionId/return", requireAuth, asyncHandler(returnItem));
