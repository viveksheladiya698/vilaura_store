import { z } from "zod";

export const updateInventorySchema = z
  .object({
    // "set" replaces quantity outright; "adjust" adds/subtracts a delta (e.g. +20 restock, -3 damaged)
    mode: z.enum(["set", "adjust"], { error: "Mode must be 'set' or 'adjust'." }),

    value: z.number({ error: "Value is required." }).int("Value must be a whole number."),

    lowStockThreshold: z
      .number()
      .int("Low stock threshold must be a whole number.")
      .min(0, "Low stock threshold cannot be negative.")
      .optional(),
  })
  .strict();

export type UpdateInventoryInput = z.infer<typeof updateInventorySchema>;