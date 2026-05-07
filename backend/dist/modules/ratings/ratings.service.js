"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRatings = listRatings;
exports.createRating = createRating;
const prisma_1 = require("../../prisma");
const app_error_1 = require("../../utils/app-error");
function listRatings() {
    return prisma_1.db.ratings;
}
function createRating(input) {
    const targetUser = prisma_1.db.users.find((entry) => entry.id === input.toUserId);
    if (!targetUser) {
        throw new app_error_1.AppError(404, "Target user not found.");
    }
    const rating = {
        id: (0, prisma_1.makeId)("rating"),
        fromUserId: input.fromUserId,
        toUserId: input.toUserId,
        score: input.score,
        comment: input.comment,
        requestId: input.requestId ?? null,
        borrowTransactionId: input.borrowTransactionId ?? null,
        createdAt: new Date().toISOString(),
    };
    prisma_1.db.ratings.unshift(rating);
    const userRatings = prisma_1.db.ratings.filter((entry) => entry.toUserId === targetUser.id);
    targetUser.rating =
        userRatings.reduce((total, entry) => total + entry.score, 0) / userRatings.length;
    targetUser.reputationScore = Math.min(100, Math.round(targetUser.rating * 20 + targetUser.successfulDeliveries + targetUser.successfulReturns));
    targetUser.updatedAt = new Date().toISOString();
    return rating;
}
