import { prisma } from "@/lib/prisma";

export const usercategoryRepository = {
    findAll() {
        return prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where:{
                isActive:true
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                image: true,
            }
        })
    },

    findById(id: number) {
        return prisma.category.findFirst({
            where: {
                id: id,
                isActive:true
            },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                image: true,
            }
        })
    }
}