import type { Job } from "bullmq";
import { logger } from "../utils/logger";

export async function processCoinJob(job: Job) {
  logger.info("Processing coin job", job.data);
}
