import "dotenv/config";
import argon2 from "argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await argon2.hash("Admin@123");

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {
      name: "Administrator",
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      name: "Administrator",
      email: "admin@example.com",
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  console.log(`Admin created: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Admin seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });