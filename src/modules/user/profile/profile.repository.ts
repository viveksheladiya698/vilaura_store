import { prisma } from "@/lib/prisma";

export const profileRepository = {
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  update(id: string, data: Partial<{ name: string; phone: string; profileImage: string }>) {
    return prisma.user.update({ where: { id }, data });
  },
};