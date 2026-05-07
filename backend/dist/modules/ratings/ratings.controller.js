"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatings = getRatings;
exports.postRating = postRating;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const ratings_service_1 = require("./ratings.service");
async function getRatings(_req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, ratings_service_1.listRatings)(), "Ratings fetched.");
}
async function postRating(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, (0, ratings_service_1.createRating)({
        fromUserId: req.user.id,
        toUserId: req.body.toUserId,
        score: req.body.score,
        comment: req.body.comment,
        requestId: req.body.requestId,
        borrowTransactionId: req.body.borrowTransactionId,
    }), "Rating created.", 201);
}
