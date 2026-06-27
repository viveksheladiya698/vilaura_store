import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({
        error: "Email is required.",
      })
      .trim()
      .email("Enter a valid email address.")
      .max(255, "Email cannot exceed 255 characters."),

    password: z
      .string({
        error: "Password is required.",
      })
      .min(1, "Password is required.")
      .max(128, "Password is too long."),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;