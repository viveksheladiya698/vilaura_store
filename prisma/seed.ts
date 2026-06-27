import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, EmployeeRole } from "../src/generated/prisma/client";
import { hash } from "argon2";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required."
    );
  }

  const passwordHash = await hash(password);

  const employee = await prisma.employee.upsert({
    where: {
      email: email.toLowerCase(),
    },
    update: {
      name: "Vilaura Admin",
      passwordHash,
      role: EmployeeRole.ADMIN,
      isActive: true,
      emailVerified: true,
    },
    create: {
      name: "Vilaura Admin",
      email: email.toLowerCase(),
      passwordHash,
      role: EmployeeRole.ADMIN,
      employeeCode: "VIL-ADMIN-001",
      jobTitle: "Administrator",
      isActive: true,
      emailVerified: true,
    },
  });

  console.log("Admin created:", employee.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });