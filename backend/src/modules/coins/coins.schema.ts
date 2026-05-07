import { z } from "zod";

export const transferCoinsSchema = z.object({
  toUserId: z.string().min(1),
  amount: z.coerce.number().int().positive(),
  description: z.string().min(3),
});
