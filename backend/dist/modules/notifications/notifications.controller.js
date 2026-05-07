"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = getNotifications;
exports.markRead = markRead;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const notifications_service_1 = require("./notifications.service");
async function getNotifications(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, (0, notifications_service_1.listNotifications)(req.user.id), "Notifications fetched.");
}
async function markRead(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, (0, notifications_service_1.markNotificationRead)(req.user.id, String(req.params.notificationId)), "Notification marked as read.");
}
