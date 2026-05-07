"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCoinJob = processCoinJob;
const logger_1 = require("../utils/logger");
async function processCoinJob(job) {
    logger_1.logger.info("Processing coin job", job.data);
}
