"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueNotificationJob = enqueueNotificationJob;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const connection = (0, redis_1.getBullConnection)();
const notificationQueue = connection
    ? new bullmq_1.Queue("notification-queue", { connection })
    : null;
async function enqueueNotificationJob(payload) {
    if (!notificationQueue) {
        return payload;
    }
    return notificationQueue.add("send-notification", payload);
}
