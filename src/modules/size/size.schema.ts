import { z } from "zod";

export const createSizeSchema = z
  .object({
    name: z
      .string({ error: "Size name is required." })
      .trim()
      .toLowerCase()
      .min(1, "Size name is required.")
      .max(20, "Size name cannot exceed 20 characters."),

    displayName: z
      .string({ error: "Display name is required." })
      .trim()
      .min(1, "Display name is required.")
      .max(50, "Display name cannot exceed 50 characters."),

    sortOrder: z.number().int().min(0).optional().default(0),
  })
  .strict();

export type CreateSizeInput = z.infer<typeof createSizeSchema>;