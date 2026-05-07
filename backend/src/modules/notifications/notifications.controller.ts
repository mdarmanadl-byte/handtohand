import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import { listNotifications, markNotificationRead } from "./notifications.service";

export async function getNotifications(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(res, listNotifications(req.user.id), "Notifications fetched.");
}

export async function markRead(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(
    res,
    markNotificationRead(req.user.id, String(req.params.notificationId)),
    "Notification marked as read.",
  );
}
