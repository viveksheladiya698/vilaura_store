import { prisma } from "@/lib/prisma";

export const sizeRepository = {
  findById(id: string) {
    return prisma.size.findUnique({ where: { id } });
  },
};