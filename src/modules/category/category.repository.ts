import { prisma } from "@/lib/prisma";

type CreateCategoryData = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
};

export const categoryRepository = {
  findByName(name: string) {
    return prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  },

  findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: {
        slug,
      },
    });
  },

  create(data: CreateCategoryData) {
    return prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        image: data.image ?? null,
      },
    });
  },

  findAll() {
    return prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findById(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  },

  findByNameExceptId(name: string, id: string) {
    return prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        NOT: {
          id,
        },
      },
    });
  },

  findBySlugExceptId(slug: string, id: string) {
    return prisma.category.findFirst({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    });
  },

  update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string | null;
      image?: string;
      isActive?: boolean;
    }
  ) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },

  deactivate(id: string) {
    return prisma.category.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  },

};