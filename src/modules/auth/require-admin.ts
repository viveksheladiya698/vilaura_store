import { createHash } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function requireAdmin() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    throw new Error("UNAUTHENTICATED");
  }

  const tokenHash = createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const session = await prisma.employeeSession.findUnique({
    where: {
      tokenHash,
    },
    include: {
      employee: true,
    },
  });

  if (!session || session.expiresAt <= new Date()) {
    throw new Error("INVALID_SESSION");
  }

  if (!session.employee.isActive) {
    throw new Error("EMPLOYEE_INACTIVE");
  }

  if (session.employee.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return session.employee;
}