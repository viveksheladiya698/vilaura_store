import { prisma } from "@/lib/prisma";

export const employeeAuthRepository = {

  findemployeeByEmail(email: string) {
    return prisma.employee.findUnique({
      where: {
        email,
      },
    });
  },

  createSession(data: {
    employeeId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    return prisma.employeeSession.create({
      data: {
        employeeId: data.employeeId,
        tokenHash: data.tokenHash,
        expiresAt: data.expiresAt,
      },
    });
  },

  deleteSessionByTokenHash(tokenHash: string) {
    return prisma.employeeSession.deleteMany({
      where: {
        tokenHash,
      },
    });
  },

}