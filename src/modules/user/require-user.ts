import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { cookies } from "next/headers";

export async function requireUser() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session_token")?.value;
    if (!userId) {
        throw new Error("UNAUTHENTICATED");
    }
    const tokenHash = createHash("sha256").update(userId).digest("hex");

    const userSession = await prisma.userSession.findUnique({
        where: {
            tokenHash,
        },
        include: {
            user: true,
        },
    });

    if (!userSession || userSession.expiresAt <= new Date()) {
        throw new Error("INVALID_SESSION");
    }

    if (!userSession.user.isActive) {
        throw new Error("USER_INACTIVE");
    }

    return userSession.user;

}

export async function getOptionalUser() {
  try {
    return await requireUser();
  } catch {
    return null;
  }
}