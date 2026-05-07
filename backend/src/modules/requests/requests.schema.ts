import { z } from "zod";

export const createRequestSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  itemName: z.string().min(2),
  type: z.enum(["CONSUMABLE", "BORROWABLE"]),
  placeId: z.string().min(1),
  rewardCoins: z.coerce.number().int().positive(),
  depositCoins: z.coerce.number().int().min(0).default(0),
  isUrgent: z.coerce.boolean().default(false),
  expiresInMinutes: z.coerce.number().int().min(10).max(480).default(120),
});

export const updateRequestStatusSchema = z.object({
  status: z.enum([
    "OPEN",
    "MATCHED",
    "ACCEPTED",
    "PICKED_UP",
    "IN_TRANSIT",
    "DELIVERED",
    "COMPLETED",
    "EXPIRED",
    "CANCELLED",
  ]),
});
