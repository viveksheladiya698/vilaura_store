import { z } from "zod";
import { Gender } from "@/generated/prisma/client";

export const productImageSchema = z
  .object({
    imageUrl: z
      .string({ error: "Image URL is required." })
      .trim()
      .url("Image URL must be a valid URL."),

    altText: z.string().trim().max(150, "Alt text cannot exceed 150 characters.").optional(),

    isPrimary: z.boolean().optional().default(false),

    sortOrder: z
      .number({ error: "Sort order must be a number." })
      .int("Sort order must be an integer.")
      .min(0, "Sort order cannot be negative.")
      .optional()
      .default(0),
  })
  .strict();

export const createProductSchema = z
  .object({
    categoryId: z.string({ error: "Category is required." }).trim().min(1, "Category is required."),

    productName: z
      .string({ error: "Product name is required." })
      .trim()
      .min(2, "Product name must contain at least 2 characters.")
      .max(150, "Product name cannot exceed 150 characters."),

    shortDescription: z.string().trim().max(200, "Short description cannot exceed 200 characters.").optional(),

    description: z.string().trim().max(2000, "Description cannot exceed 2000 characters.").optional(),

    price: z
      .number({ error: "Price is required." })
      .positive("Price must be greater than 0.")
      .max(1000000, "Price is too large."),

    gender: z.nativeEnum(Gender, { error: "Invalid gender value." }),

    images: z
      .array(productImageSchema, { error: "At least one image is required." })
      .min(1, "Please add at least one product image."),
  })
  .strict();

export type CreateProductInput = z.infer<typeof createProductSchema>;