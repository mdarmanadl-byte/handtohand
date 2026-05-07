"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listItems = listItems;
exports.createItem = createItem;
exports.createBorrowRequest = createBorrowRequest;
exports.acceptBorrowRequest = acceptBorrowRequest;
exports.returnBorrowedItem = returnBorrowedItem;
const prisma_1 = require("../../prisma");
const app_error_1 = require("../../utils/app-error");
const coins_service_1 = require("../coins/coins.service");
const notifications_service_1 = require("../notifications/notifications.service");
function listItems() {
    return prisma_1.db.items;
}
async function createItem(ownerId, payload) {
    const timestamp = new Date().toISOString();
    const item = {
        id: (0, prisma_1.makeId)("item"),
        ownerId,
        title: payload.title,
        description: payload.description,
        category: payload.category,
        securityDepositCoins: payload.securityDepositCoins,
        dailyRateCoins: payload.dailyRateCoins,
        status: "AVAILABLE",
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    prisma_1.db.items.unshift(item);
    return item;
}
async function createBorrowRequest(itemId, borrowerId, returnInDays) {
    const item = prisma_1.db.items.find((entry) => entry.id === itemId);
    if (!item) {
        throw new app_error_1.AppError(404, "Item not found.");
    }
    if (item.status !== "AVAILABLE") {
        throw new app_error_1.AppError(409, "Item is not available.");
    }
    (0, coins_service_1.holdEscrow)(borrowerId, item.securityDepositCoins, item.id, `Deposit held for borrowing ${item.title}`);
    item.status = "RESERVED";
    item.updatedAt = new Date().toISOString();
    const transaction = {
        id: (0, prisma_1.makeId)("borrow"),
        itemId,
        borrowerId,
        ownerId: item.ownerId,
        status: "REQUESTED",
        depositCoins: item.securityDepositCoins,
        returnDueAt: new Date(Date.now() + returnInDays * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    prisma_1.db.borrowTransactions.unshift(transaction);
    await (0, notifications_service_1.createNotification)({
        userId: item.ownerId,
        title: "Borrow request received",
        body: `${item.title} now has a pending borrower request.`,
        type: "BORROWABLE",
        priority: "MEDIUM",
    });
    return transaction;
}
async function acceptBorrowRequest(transactionId, ownerId) {
    const transaction = prisma_1.db.borrowTransactions.find((entry) => entry.id === transactionId);
    if (!transaction || transaction.ownerId !== ownerId) {
        throw new app_error_1.AppError(404, "Borrow transaction not found.");
    }
    const item = prisma_1.db.items.find((entry) => entry.id === transaction.itemId);
    if (!item) {
        throw new app_error_1.AppError(404, "Item not found.");
    }
    transaction.status = "BORROWED";
    transaction.updatedAt = new Date().toISOString();
    item.status = "BORROWED";
    item.updatedAt = new Date().toISOString();
    return transaction;
}
async function returnBorrowedItem(transactionId) {
    const transaction = prisma_1.db.borrowTransactions.find((entry) => entry.id === transactionId);
    if (!transaction) {
        throw new app_error_1.AppError(404, "Borrow transaction not found.");
    }
    const item = prisma_1.db.items.find((entry) => entry.id === transaction.itemId);
    if (!item) {
        throw new app_error_1.AppError(404, "Item not found.");
    }
    transaction.status = "COMPLETED";
    transaction.updatedAt = new Date().toISOString();
    item.status = "AVAILABLE";
    item.updatedAt = new Date().toISOString();
    (0, coins_service_1.refundEscrow)(transaction.borrowerId, transaction.depositCoins, transaction.id, "Borrow deposit refunded after return");
    return transaction;
}
