import { z } from "zod";

export const createColorSchema = z
  .object({
    name: z
      .string({ error: "Color name is required." })
      .trim()
      .toLowerCase()
      .min(1, "Color name is required.")
      .max(30, "Color name cannot exceed 30 characters."),

    hexCode: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, "Hex code must be a valid color, e.g. #FF0000.")
      .optional(),

    sortOrder: z.number().int().min(0).optional().default(0),
  })
  .strict();

export type CreateColorInput = z.infer<typeof createColorSchema>;


export const updateColorSchema = z
  .object({
    name: z.string().trim().toLowerCase().min(1).max(30).optional(),
    hexCode: z
      .string()
      .trim()
      .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, "Hex code must be a valid color, e.g. #FF0000.")
      .optional(),
    sortOrder: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export type UpdateColorInput = z.infer<typeof updateColorSchema>;