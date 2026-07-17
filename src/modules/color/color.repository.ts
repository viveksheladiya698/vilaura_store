import { prisma } from "@/lib/prisma";

export const colorRepository = {
  findById(id: string) {
    return prisma.color.findUnique({ where: { id } });
  },

  findByName(name: string) {
    return prisma.color.findUnique({ where: { name } });
  },

  findAll() {
    return prisma.color.findMany({ orderBy: { sortOrder: "asc" } });
  },

  create(data: { name: string; hexCode?: string; sortOrder?: number }) {
    return prisma.color.create({
      data: {
        name: data.name,
        hexCode: data.hexCode ?? null,
        sortOrder: data.sortOrder ?? 0,
      },
    });
  },
};