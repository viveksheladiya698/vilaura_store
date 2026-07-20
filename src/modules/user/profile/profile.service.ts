import { profileRepository } from "./profile.repository";
import type { UpdateProfileInput } from "./profile.schema";

// Strip sensitive fields before anything reaches the client
export function toPublicUser(user: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileImage: user.profileImage,
    role: user.role,
    isActive: user.isActive,
    emailVerified: user.emailVerified,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function getProfile(userId: string) {
  const user = await profileRepository.findById(userId);
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  return toPublicUser(user);
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput,
  profileImage?: string
) {
  const user = await profileRepository.update(userId, {
    name: input.name?.trim(),
    phone: input.phone?.trim(),
    ...(profileImage ? { profileImage } : {}),
  });

  return toPublicUser(user);
}