import { z } from "zod";

export const addVariantSchema = z
  .object({
    sizeId: z.string({ error: "Size is required." }).trim().min(1, "Size is required."),

    colorId: z.string({ error: "Color is required." }).trim().min(1, "Color is required."),

    sku: z
      .string({ error: "SKU is required." })
      .trim()
      .min(3, "SKU must contain at least 3 characters.")
      .max(50, "SKU cannot exceed 50 characters."),

    priceOverride: z.number().positive("Price override must be greater than 0.").optional(),

    quantity: z
      .number({ error: "Quantity is required." })
      .int("Quantity must be a whole number.")
      .min(0, "Quantity cannot be negative."),

    lowStockThreshold: z
      .number()
      .int("Low stock threshold must be a whole number.")
      .min(0, "Low stock threshold cannot be negative.")
      .optional()
      .default(5),
  })
  .strict();

export type AddVariantInput = z.infer<typeof addVariantSchema>;