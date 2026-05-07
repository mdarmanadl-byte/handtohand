"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
exports.listNotifications = listNotifications;
exports.markNotificationRead = markNotificationRead;
const prisma_1 = require("../../prisma");
const app_error_1 = require("../../utils/app-error");
const notification_queue_1 = require("../../queues/notification.queue");
async function createNotification(input) {
    const notification = {
        id: (0, prisma_1.makeId)("notification"),
        userId: input.userId,
        title: input.title,
        body: input.body,
        type: input.type,
        priority: input.priority,
        read: false,
        cooldownKey: input.cooldownKey ?? null,
        createdAt: new Date().toISOString(),
    };
    prisma_1.db.notifications.unshift(notification);
    await (0, notification_queue_1.enqueueNotificationJob)(notification);
    return notification;
}
function listNotifications(userId) {
    return prisma_1.db.notifications.filter((entry) => entry.userId === userId);
}
function markNotificationRead(userId, notificationId) {
    const notification = prisma_1.db.notifications.find((entry) => entry.id === notificationId && entry.userId === userId);
    if (!notification) {
        throw new app_error_1.AppError(404, "Notification not found.");
    }
    notification.read = true;
    return notification;
}
