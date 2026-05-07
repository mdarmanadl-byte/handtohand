"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "test", "production"])
        .default("development"),
    PORT: zod_1.z.coerce.number().default(5000),
    DATABASE_URL: zod_1.z.string().default("postgresql://postgres:password@localhost:5432/handtohand"),
    JWT_SECRET: zod_1.z.string().min(8).default("supersecret"),
    JWT_EXPIRES_IN: zod_1.z.string().default("7d"),
    REDIS_URL: zod_1.z.string().default("redis://localhost:6379"),
    REDIS_ENABLED: zod_1.z.coerce.boolean().default(false),
    FCM_ENABLED: zod_1.z.coerce.boolean().default(false),
    APP_BASE_URL: zod_1.z.string().default("http://localhost:3000"),
    GOOGLE_CLIENT_ID: zod_1.z.string().optional(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string().optional(),
});
exports.env = envSchema.parse(process.env);
