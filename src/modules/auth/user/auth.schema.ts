import { z } from "zod";

export const loginSchema = z.object({
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


export const registerSchema = z.object({
  name: z.string({
    error: "Please Enter Name Field.",
  })
    .min(2, "Enter at least 2 characters.")
    .max(255, "Name cannot exceed 255 characters."),

  email: z.string({
    error: "Please Enter Email Field.",
  })
    .trim()
    .email("Enter a valid email address.")
    .max(255, "Email cannot exceed 255 characters."),

  password: z.string({
    error: "Please Enter Password Field.",
  })
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password is too long."),
})

export type RegisterInput = z.infer<typeof registerSchema>;