import { Queue } from "bullmq";
import { getBullConnection } from "../config/redis";

const connection = getBullConnection();
const coinQueue = connection ? new Queue("coin-queue", { connection }) : null;

export async function enqueueCoinUpdate(payload: unknown) {
  if (!coinQueue) {
    return payload;
  }

  return coinQueue.add("coin-ledger-update", payload);
}
