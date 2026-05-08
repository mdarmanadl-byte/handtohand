import type { ApiEnvelope, Notification } from "@/types";
import { api } from "./api";

export async function fetchNotifications() {
  const response = await api.get<ApiEnvelope<Notification[]>>("/notifications");
  return response.data.data;
}

export async function markNotificationRead(notificationId: string) {
  const response = await api.patch<ApiEnvelope<Notification>>(
    `/notifications/${notificationId}/read`,
  );
  return response.data.data;
}
