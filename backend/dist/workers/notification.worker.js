"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNotificationJob = processNotificationJob;
const logger_1 = require("../utils/logger");
async function processNotificationJob(job) {
    logger_1.logger.info("Processing notification job", job.data);
}
