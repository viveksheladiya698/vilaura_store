import { prisma } from "@/lib/prisma";

export const sizeRepository = {
  findById(id: string) {
    return prisma.size.findUnique({ where: { id } });
  },

  findByName(name: string) {
    return prisma.size.findUnique({ where: { name } });
  },

  findAll() {
    return prisma.size.findMany({ orderBy: { sortOrder: "asc" } });
  },

  create(data: { name: string; displayName: string; sortOrder?: number }) {
    return prisma.size.create({
      data: {
        name: data.name,
        displayName: data.displayName,
        sortOrder: data.sortOrder ?? 0,
      },
    });
  },

  findByNameExceptId(name: string, id: string) {
    return prisma.size.findFirst({ where: { name, NOT: { id } } });
  },

  update(id: string, data: Partial<{ name: string; displayName: string; sortOrder: number; isActive: boolean }>) {
    return prisma.size.update({ where: { id }, data });
  },


};