import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { getRatings, postRating } from "./ratings.controller";
import { createRatingSchema } from "./ratings.schema";

export const ratingsRouter = Router();

ratingsRouter.get("/", asyncHandler(getRatings));
ratingsRouter.post("/", requireAuth, validate({ body: createRatingSchema }), asyncHandler(postRating));
