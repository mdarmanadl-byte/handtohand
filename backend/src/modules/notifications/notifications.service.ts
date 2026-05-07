import { db, makeId } from "../../prisma";
import type { NotificationPriority, NotificationType } from "../../types/domain";
import { AppError } from "../../utils/app-error";
import { enqueueNotificationJob } from "../../queues/notification.queue";

export async function createNotification(input: {
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  priority: NotificationPriority;
  cooldownKey?: string | null;
}) {
  const notification = {
    id: makeId("notification"),
    userId: input.userId,
    title: input.title,
    body: input.body,
    type: input.type,
    priority: input.priority,
    read: false,
    cooldownKey: input.cooldownKey ?? null,
    createdAt: new Date().toISOString(),
  };

  db.notifications.unshift(notification);
  await enqueueNotificationJob(notification);
  return notification;
}

export function listNotifications(userId: string) {
  return db.notifications.filter((entry) => entry.userId === userId);
}

export function markNotificationRead(userId: string, notificationId: string) {
  const notification = db.notifications.find(
    (entry) => entry.id === notificationId && entry.userId === userId,
  );

  if (!notification) {
    throw new AppError(404, "Notification not found.");
  }

  notification.read = true;
  return notification;
}
