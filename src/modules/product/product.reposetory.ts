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
      },
    });
  },

  findBySlugExceptId(slug: string, id: string) {
    return prisma.product.findFirst({
      where: { slug, NOT: { id } },
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

  update(
    id: string,
    data: Partial<{
      categoryId: string;
      productName: string;
      slug: string;
      shortDescription: string | null;
      description: string | null;
      price: number;
      gender: Gender;
      isActive: boolean;
    }>
  ) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });
  },

  deleteImages(productId: string, imageIds: string[]) {
    return prisma.productImage.deleteMany({
      where: { id: { in: imageIds }, productId },
    });
  },

  addImages(productId: string, images: ProductImageData[]) {
    return prisma.productImage.createMany({
      data: images.map((img) => ({
        productId,
        imageUrl: img.imageUrl,
        altText: img.altText ?? null,
        isPrimary: img.isPrimary ?? false,
        sortOrder: img.sortOrder ?? 0,
      })),
    });
  },

  // add to productRepository
  findAll(params: {
    skip: number;
    take: number;
    search?: string;
    categoryId?: string;
    isActive?: boolean;
  }) {
    return prisma.product.findMany({
      where: {
        ...(params.search
          ? { productName: { contains: params.search, mode: "insensitive" } }
          : {}),
        ...(params.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params.isActive !== undefined ? { isActive: params.isActive } : {}),
      },
      skip: params.skip,
      take: params.take,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: { where: { isPrimary: true }, take: 1 },
        variants: {
          select: {
            id: true,
            isActive: true,
            inventory: { select: { quantity: true } },
          },
        },
      },
    });
  },

  count(params: { search?: string; categoryId?: string; isActive?: boolean }) {
    return prisma.product.count({
      where: {
        ...(params.search
          ? { productName: { contains: params.search, mode: "insensitive" } }
          : {}),
        ...(params.categoryId ? { categoryId: params.categoryId } : {}),
        ...(params.isActive !== undefined ? { isActive: params.isActive } : {}),
      },
    });
  },

  findByIdFull(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        variants: {
          include: {
            size: true,
            color: true,
            inventory: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });
  },


  

};