"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = getWallet;
exports.holdEscrow = holdEscrow;
exports.releaseEscrow = releaseEscrow;
exports.refundEscrow = refundEscrow;
exports.transferCoins = transferCoins;
const prisma_1 = require("../../prisma");
const app_error_1 = require("../../utils/app-error");
const coin_queue_1 = require("../../queues/coin.queue");
function recordTransaction(input) {
    const user = prisma_1.db.users.find((entry) => entry.id === input.userId);
    if (!user) {
        throw new app_error_1.AppError(404, "User not found.");
    }
    if (input.direction === "DEBIT" && user.coins < input.amount) {
        throw new app_error_1.AppError(400, "Insufficient coins.");
    }
    user.coins += input.direction === "CREDIT" ? input.amount : -input.amount;
    user.updatedAt = new Date().toISOString();
    const transaction = {
        id: (0, prisma_1.makeId)("coin"),
        userId: input.userId,
        amount: input.amount,
        type: input.type,
        direction: input.direction,
        reference: input.reference,
        description: input.description,
        createdAt: new Date().toISOString(),
    };
    prisma_1.db.coinTransactions.unshift(transaction);
    void (0, coin_queue_1.enqueueCoinUpdate)(transaction);
    return transaction;
}
function getWallet(userId) {
    const user = prisma_1.db.users.find((entry) => entry.id === userId);
    if (!user) {
        throw new app_error_1.AppError(404, "User not found.");
    }
    return {
        balance: user.coins,
        history: prisma_1.db.coinTransactions.filter((entry) => entry.userId === userId).slice(0, 20),
    };
}
function holdEscrow(userId, amount, reference, description) {
    return recordTransaction({
        userId,
        amount,
        direction: "DEBIT",
        type: "ESCROW_HOLD",
        reference,
        description,
    });
}
function releaseEscrow(userId, amount, reference, description) {
    return recordTransaction({
        userId,
        amount,
        direction: "CREDIT",
        type: "ESCROW_RELEASE",
        reference,
        description,
    });
}
function refundEscrow(userId, amount, reference, description) {
    return recordTransaction({
        userId,
        amount,
        direction: "CREDIT",
        type: "REFUND",
        reference,
        description,
    });
}
function transferCoins(input) {
    recordTransaction({
        userId: input.fromUserId,
        amount: input.amount,
        direction: "DEBIT",
        type: "SPEND",
        reference: `${input.fromUserId}:${input.toUserId}`,
        description: input.description,
    });
    return recordTransaction({
        userId: input.toUserId,
        amount: input.amount,
        direction: "CREDIT",
        type: "EARN",
        reference: `${input.fromUserId}:${input.toUserId}`,
        description: input.description,
    });
}
