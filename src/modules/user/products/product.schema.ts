import { z } from "zod";
import { Gender } from "@/generated/prisma/client";

export const publicListProductsSchema = z
  .object({
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(50).optional().default(20),
    search: z.string().trim().optional(),
    categoryId: z.string().trim().optional(),
    categorySlug: z.string().trim().optional(),
    gender: z.nativeEnum(Gender).optional(),
    minPrice: z.number().positive().optional(),
    maxPrice: z.number().positive().optional(),
    sort: z.enum(["newest", "price_asc", "price_desc"]).optional().default("newest"),
  })
  .strict();

export type PublicListProductsInput = z.infer<typeof publicListProductsSchema>;