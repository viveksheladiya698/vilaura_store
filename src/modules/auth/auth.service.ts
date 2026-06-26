import argon2 from "argon2";
import { createHash, randomBytes } from "crypto";
import { authRepository } from "./auth.repository";
import type { LoginInput } from "./auth.schema";
import type { RegisterInput } from "./auth.schema";

const SESSION_DURATION_DAYS = 7;

export async function loginUser(input: LoginInput) {
  const email = input.email.trim().toLowerCase();

  const user = await authRepository.findUserByEmail(email);

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

  await authRepository.createSession({
    userId: user.id,
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

export async function registerUser(input: RegisterInput) {
  const email = input.email.trim().toLowerCase();

  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await argon2.hash(input.password);

  const user = await authRepository.createuser({
    name: input.name,
    email,
    passwordHash,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}