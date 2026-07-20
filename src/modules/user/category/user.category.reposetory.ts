import { prisma } from "@/lib/prisma";

export const publicCategoryRepository = {
  findAllPublic() {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, description: true, image: true },
    });
  },
};