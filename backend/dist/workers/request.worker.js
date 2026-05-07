"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRequestExpiryJob = processRequestExpiryJob;
const prisma_1 = require("../prisma");
const logger_1 = require("../utils/logger");
async function processRequestExpiryJob(job) {
    const request = prisma_1.db.requests.find((entry) => entry.id === job.data.requestId);
    if (!request || ["COMPLETED", "CANCELLED"].includes(request.status)) {
        return;
    }
    request.status = "EXPIRED";
    request.updatedAt = new Date().toISOString();
    logger_1.logger.info(`Request expired: ${request.id}`);
}
