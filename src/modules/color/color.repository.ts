import { prisma } from "@/lib/prisma";

export const colorRepository = {
  findById(id: string) {
    return prisma.color.findUnique({ where: { id } });
  },
};