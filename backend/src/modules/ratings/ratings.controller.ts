import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import { createRating, listRatings } from "./ratings.service";

export async function getRatings(_req: Request, res: Response) {
  return sendSuccess(res, listRatings(), "Ratings fetched.");
}

export async function postRating(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(
    res,
    createRating({
      fromUserId: req.user.id,
      toUserId: req.body.toUserId,
      score: req.body.score,
      comment: req.body.comment,
      requestId: req.body.requestId,
      borrowTransactionId: req.body.borrowTransactionId,
    }),
    "Rating created.",
    201,
  );
}
