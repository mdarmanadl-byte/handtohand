import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().refine((value) => value.endsWith("@iitd.ac.in"), {
    message: "Only @iitd.ac.in email addresses are allowed.",
  }),
  password: z.string().min(6),
  hostelName: z.string().min(2),
  wing: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
