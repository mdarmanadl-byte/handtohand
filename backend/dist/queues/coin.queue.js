"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueCoinUpdate = enqueueCoinUpdate;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const connection = (0, redis_1.getBullConnection)();
const coinQueue = connection ? new bullmq_1.Queue("coin-queue", { connection }) : null;
async function enqueueCoinUpdate(payload) {
    if (!coinQueue) {
        return payload;
    }
    return coinQueue.add("coin-ledger-update", payload);
}
