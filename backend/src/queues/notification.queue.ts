import { Queue } from "bullmq";
import { getBullConnection } from "../config/redis";

const connection = getBullConnection();
const notificationQueue = connection
  ? new Queue("notification-queue", { connection })
  : null;

export async function enqueueNotificationJob(payload: unknown) {
  if (!notificationQueue) {
    return payload;
  }

  return notificationQueue.add("send-notification", payload);
}
