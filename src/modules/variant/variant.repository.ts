import { prisma } from "@/lib/prisma";

type CreateVariantData = {
  sizeId: string;
  colorId: string;
  sku: string;
  priceOverride?: number;
  quantity: number;
  lowStockThreshold?: number;
};

export const variantRepository = {
  findByProductSizeColor(productId: string, sizeId: string, colorId: string) {
    return prisma.productVariant.findUnique({
      where: {
        productId_sizeId_colorId: { productId, sizeId, colorId },
      },
    });
  },

  findBySku(sku: string) {
    return prisma.productVariant.findUnique({ where: { sku } });
  },

  create(productId: string, data: CreateVariantData) {
    return prisma.productVariant.create({
      data: {
        productId,
        sizeId: data.sizeId,
        colorId: data.colorId,
        sku: data.sku,
        priceOverride: data.priceOverride ?? null,
        inventory: {
          create: {
            quantity: data.quantity,
            lowStockThreshold: data.lowStockThreshold ?? 5,
          },
        },
      },
      include: { size: true, color: true, inventory: true },
    });
  },

  findById(variantId: string) {
    return prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { size: true, color: true, inventory: true },
    });
  },

  findBySkuExceptId(sku: string, variantId: string) {
    return prisma.productVariant.findFirst({
      where: { sku, NOT: { id: variantId } },
    });
  },

  update(
    variantId: string,
    data: Partial<{ sku: string; priceOverride: number | null; isActive: boolean }>
  ) {
    return prisma.productVariant.update({
      where: { id: variantId },
      data,
      include: { size: true, color: true, inventory: true },
    });
  },



};