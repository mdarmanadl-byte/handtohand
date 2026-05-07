import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string().default("postgresql://postgres:password@localhost:5432/handtohand"),
  JWT_SECRET: z.string().min(8).default("supersecret"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  REDIS_ENABLED: z.coerce.boolean().default(false),
  FCM_ENABLED: z.coerce.boolean().default(false),
  APP_BASE_URL: z.string().default("http://localhost:3000"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);
