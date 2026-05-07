import { z } from "zod";

export const createItemSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  category: z.string().min(2),
  securityDepositCoins: z.coerce.number().int().min(0),
  dailyRateCoins: z.coerce.number().int().min(0),
});

export const borrowItemSchema = z.object({
  returnInDays: z.coerce.number().int().min(1).max(14),
});
