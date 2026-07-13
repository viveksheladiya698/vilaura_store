import { employeeAuthRepository } from "./auth.repository";
import { LoginInput } from "./auth.schema";
import argon2 from "argon2";
import { createHash, randomBytes } from "crypto";

const SESSION_DURATION_DAYS = 7;

export async function loginEmployee(input: LoginInput) {
  const email = input.email.trim().toLowerCase();

  const user = await employeeAuthRepository.findemployeeByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (!user.isActive) {
    throw new Error("ACCOUNT_INACTIVE");
  }

  const passwordIsValid = await argon2.verify(
    user.passwordHash,
    input.password
  );

  if (!passwordIsValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const sessionToken = randomBytes(32).toString("hex");

  const tokenHash = createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + SESSION_DURATION_DAYS
  );

  await employeeAuthRepository.createSession({
    employeeId: user.id,
    tokenHash,
    expiresAt,
  });

  return {
    sessionToken,
    expiresAt,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function logoutUser(sessionToken: string) {
  const tokenHash = createHash("sha256")
    .update(sessionToken)
    .digest("hex");

  await employeeAuthRepository.deleteSessionByTokenHash(tokenHash);
}