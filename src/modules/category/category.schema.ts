import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
      .string({
        error: "Category name is required.",
      })
      .trim()
      .min(2, "Category name must contain at least 2 characters.")
      .max(100, "Category name cannot exceed 100 characters."),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),
  }).strict();

export type CreateCategoryInput = z.infer<
  typeof createCategorySchema
>;


export const updateCategorySchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must contain at least 2 characters.")
      .max(100, "Category name cannot exceed 100 characters.")
      .optional(),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters.")
      .optional(),

    isActive: z.boolean().optional(),
  }).strict();

export type UpdateCategoryInput = z.infer<
  typeof updateCategorySchema
>;