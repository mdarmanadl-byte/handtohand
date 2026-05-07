import { z } from "zod";

export const createRatingSchema = z.object({
  toUserId: z.string().min(1),
  score: z.coerce.number().min(1).max(5),
  comment: z.string().min(3),
  requestId: z.string().optional(),
  borrowTransactionId: z.string().optional(),
});
