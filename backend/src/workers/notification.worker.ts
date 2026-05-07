import type { Job } from "bullmq";
import { logger } from "../utils/logger";

export async function processNotificationJob(job: Job) {
  logger.info("Processing notification job", job.data);
}
