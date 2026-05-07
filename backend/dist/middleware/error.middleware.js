"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
exports.errorMiddleware = errorMiddleware;
const app_error_1 = require("../utils/app-error");
const logger_1 = require("../utils/logger");
function notFoundMiddleware(req, _res, next) {
    next(new app_error_1.AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}
function errorMiddleware(error, _req, res, _next) {
    const statusCode = error instanceof app_error_1.AppError ? error.statusCode : 500;
    const details = error instanceof app_error_1.AppError ? error.details : undefined;
    if (statusCode >= 500) {
        logger_1.logger.error(error.message, details);
    }
    return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error",
        details,
    });
}
