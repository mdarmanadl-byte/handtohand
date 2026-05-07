import { db, makeId } from "../../prisma";
import { AppError } from "../../utils/app-error";

export function listRatings() {
  return db.ratings;
}

export function createRating(input: {
  fromUserId: string;
  toUserId: string;
  score: number;
  comment: string;
  requestId?: string;
  borrowTransactionId?: string;
}) {
  const targetUser = db.users.find((entry) => entry.id === input.toUserId);

  if (!targetUser) {
    throw new AppError(404, "Target user not found.");
  }

  const rating = {
    id: makeId("rating"),
    fromUserId: input.fromUserId,
    toUserId: input.toUserId,
    score: input.score,
    comment: input.comment,
    requestId: input.requestId ?? null,
    borrowTransactionId: input.borrowTransactionId ?? null,
    createdAt: new Date().toISOString(),
  };

  db.ratings.unshift(rating);
  const userRatings = db.ratings.filter((entry) => entry.toUserId === targetUser.id);
  targetUser.rating =
    userRatings.reduce((total, entry) => total + entry.score, 0) / userRatings.length;
  targetUser.reputationScore = Math.min(
    100,
    Math.round(targetUser.rating * 20 + targetUser.successfulDeliveries + targetUser.successfulReturns),
  );
  targetUser.updatedAt = new Date().toISOString();

  return rating;
}
