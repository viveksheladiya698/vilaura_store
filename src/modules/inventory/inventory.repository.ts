import { prisma } from "@/lib/prisma";

export const inventoryRepository = {
  findByVariantId(variantId: string) {
    return prisma.inventory.findUnique({ where: { variantId } });
  },

  update(variantId: string, data: { quantity?: number; lowStockThreshold?: number }) {
    return prisma.inventory.update({ where: { variantId }, data });
  },
};