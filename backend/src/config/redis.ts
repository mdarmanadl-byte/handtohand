import type { ConnectionOptions } from "bullmq";
import Redis from "ioredis";
import { env } from "./env";
import { logger } from "../utils/logger";

let redis: Redis | null = null;

export function getRedisClient() {
  if (!env.REDIS_ENABLED) {
    return null;
  }

  if (!redis) {
    redis = new Redis(env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: null,
    });

    redis.on("error", (error) => {
      logger.warn("Redis connection warning", error.message);
    });
  }

  return redis;
}

export function getBullConnection(): ConnectionOptions | null {
  if (!env.REDIS_ENABLED) {
    return null;
  }

  return {
    host: new URL(env.REDIS_URL).hostname,
    port: Number(new URL(env.REDIS_URL).port || 6379),
  };
}
