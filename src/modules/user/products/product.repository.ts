import { prisma } from "@/lib/prisma";
import { Gender } from "@/generated/prisma/client";

export const publicProductRepository = {
  findPublic(params: {
    skip: number;
    take: number;
    search?: string;
    categoryId?: string;
    categorySlug?: string;
    gender?: Gender;
    minPrice?: number;
    maxPrice?: number;
    sort: "newest" | "price_asc" | "price_desc";
  }) {
    const orderBy =
      params.sort === "price_asc"
        ? { price: "asc" as const }
        : params.sort === "price_desc"
        ? { price: "desc" as const }
        : { createdAt: "desc" as const };

    return prisma.product.findMany({
      where: {
        isActive: true,
        ...(params.search ? { productName: { contains: params.search, mode: "insensitive" } } : {}),
        ...(params.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params.categorySlug ? { category: { slug: params.categorySlug } } : {}),
        ...(params.gender ? { gender: params.gender } : {}),
        ...(params.minPrice || params.maxPrice
          ? {
              price: {
                ...(params.minPrice ? { gte: params.minPrice } : {}),
                ...(params.maxPrice ? { lte: params.maxPrice } : {}),
              },
            }
          : {}),
        variants: { some: { isActive: true, inventory: { quantity: { gt: 0 } } } },
      },
      skip: params.skip,
      take: params.take,
      orderBy,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { where: { isPrimary: true }, take: 1 },
      },
    });
  },

  countPublic(params: {
    search?: string;
    categoryId?: string;
    categorySlug?: string;
    gender?: Gender;
    minPrice?: number;
    maxPrice?: number;
  }) {
    return prisma.product.count({
      where: {
        isActive: true,
        ...(params.search ? { productName: { contains: params.search, mode: "insensitive" } } : {}),
        ...(params.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params.categorySlug ? { category: { slug: params.categorySlug } } : {}),
        ...(params.gender ? { gender: params.gender } : {}),
        ...(params.minPrice || params.maxPrice
          ? {
              price: {
                ...(params.minPrice ? { gte: params.minPrice } : {}),
                ...(params.maxPrice ? { lte: params.maxPrice } : {}),
              },
            }
          : {}),
        variants: { some: { isActive: true, inventory: { quantity: { gt: 0 } } } },
      },
    });
  },

  findBySlugPublic(slug: string) {
    return prisma.product.findFirst({
      where: { slug, isActive: true },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: "asc" } },
        variants: {
          where: { isActive: true },
          include: {
            size: true,
            color: true,
            inventory: { select: { quantity: true } },
          },
        },
      },
    });
  },
};