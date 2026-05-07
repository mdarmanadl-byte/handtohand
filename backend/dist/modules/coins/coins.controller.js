"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallet = wallet;
exports.transfer = transfer;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const coins_service_1 = require("./coins.service");
async function wallet(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, (0, coins_service_1.getWallet)(req.user.id), "Wallet fetched.");
}
async function transfer(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, (0, coins_service_1.transferCoins)({
        fromUserId: req.user.id,
        toUserId: req.body.toUserId,
        amount: req.body.amount,
        description: req.body.description,
    }), "Coins transferred.");
}
