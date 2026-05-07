"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = getRedisClient;
exports.getBullConnection = getBullConnection;
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
let redis = null;
function getRedisClient() {
    if (!env_1.env.REDIS_ENABLED) {
        return null;
    }
    if (!redis) {
        redis = new ioredis_1.default(env_1.env.REDIS_URL, {
            lazyConnect: true,
            maxRetriesPerRequest: null,
        });
        redis.on("error", (error) => {
            logger_1.logger.warn("Redis connection warning", error.message);
        });
    }
    return redis;
}
function getBullConnection() {
    if (!env_1.env.REDIS_ENABLED) {
        return null;
    }
    return {
        host: new URL(env_1.env.REDIS_URL).hostname,
        port: Number(new URL(env_1.env.REDIS_URL).port || 6379),
    };
}
