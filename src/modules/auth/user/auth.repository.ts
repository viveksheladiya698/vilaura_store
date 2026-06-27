import { prisma } from "@/lib/prisma";

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  createSession(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    return prisma.userSession.create({
      data: {
        userId: data.userId,
        tokenHash: data.tokenHash,
        expiresAt: data.expiresAt,
      },
    });
  },

  createuser(data: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
      },
    });
  },

  deleteSessionByTokenHash(tokenHash: string) {
    return prisma.userSession.deleteMany({
      where: {
        tokenHash,
      },
    });
  },

};