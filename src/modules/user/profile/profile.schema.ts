import { z } from "zod";

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2, "Name must contain at least 2 characters.").max(100).optional(),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Phone number must be a valid 10-digit number.")
      .optional(),
  })
  .strict();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;