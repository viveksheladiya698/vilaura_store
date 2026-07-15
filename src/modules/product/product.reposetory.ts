import { prisma } from "@/lib/prisma";
import { Gender } from "@/generated/prisma/client";

type ProductImageData = {
  imageUrl: string;
  altText?: string;
  isPrimary?: boolean;
  sortOrder?: number;
};

type CreateProductData = {
  categoryId: string;
  productName: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price: number;
  gender: Gender;
  images: ProductImageData[];
};

export const productRepository = {
  findBySlug(slug: string) {
    return prisma.product.findUnique({ where: { slug } });
  },

  findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        variants: { include: { size: true, color: true, inventory: true } },
      },
    });
  },

  create(data: CreateProductData) {
    return prisma.product.create({
      data: {
        categoryId: data.categoryId,
        productName: data.productName,
        slug: data.slug,
        shortDescription: data.shortDescription ?? null,
        description: data.description ?? null,
        price: data.price,
        gender: data.gender,
        images: {
          create: data.images.map((img) => ({
            imageUrl: img.imageUrl,
            altText: img.altText ?? null,
            isPrimary: img.isPrimary ?? false,
            sortOrder: img.sortOrder ?? 0,
          })),
        },
      },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });
  },
};