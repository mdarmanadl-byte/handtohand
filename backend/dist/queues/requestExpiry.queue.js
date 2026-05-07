"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueRequestExpiry = enqueueRequestExpiry;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const connection = (0, redis_1.getBullConnection)();
const requestExpiryQueue = connection
    ? new bullmq_1.Queue("request-expiry-queue", { connection })
    : null;
async function enqueueRequestExpiry(payload) {
    if (!requestExpiryQueue) {
        return payload;
    }
    const delay = Math.max(new Date(payload.expiresAt).getTime() - Date.now(), 0);
    return requestExpiryQueue.add("expire-request", payload, { delay });
}
