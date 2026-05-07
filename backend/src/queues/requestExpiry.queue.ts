import { Queue } from "bullmq";
import { getBullConnection } from "../config/redis";

const connection = getBullConnection();
const requestExpiryQueue = connection
  ? new Queue("request-expiry-queue", { connection })
  : null;

export async function enqueueRequestExpiry(payload: {
  requestId: string;
  expiresAt: string;
}) {
  if (!requestExpiryQueue) {
    return payload;
  }

  const delay = Math.max(new Date(payload.expiresAt).getTime() - Date.now(), 0);
  return requestExpiryQueue.add("expire-request", payload, { delay });
}
