import type { Job } from "bullmq";
import { db } from "../prisma";
import { logger } from "../utils/logger";

export async function processRequestExpiryJob(job: Job<{ requestId: string }>) {
  const request = db.requests.find((entry) => entry.id === job.data.requestId);

  if (!request || ["COMPLETED", "CANCELLED"].includes(request.status)) {
    return;
  }

  request.status = "EXPIRED";
  request.updatedAt = new Date().toISOString();
  logger.info(`Request expired: ${request.id}`);
}
