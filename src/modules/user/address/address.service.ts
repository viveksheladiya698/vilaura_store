import { prisma } from "@/lib/prisma";
import { addressRepository } from "./address.repository";
import type { CreateAddressInput, UpdateAddressInput } from "./address.schema";

export async function listAddresses(userId: string) {
  return addressRepository.findAllByUser(userId);
}

export async function createAddress(userId: string, input: CreateAddressInput) {
  // If this is set as default, unset any existing default first — do both in one transaction
  // so we never end up with two "default" addresses at once.
  return prisma.$transaction(async (tx) => {
    if (input.isDefault) {
      await tx.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return tx.address.create({
      data: {
        userId,
        type: input.type,
        label: input.label,
        fullName: input.fullName.trim(),
        phone: input.phone.trim(),
        addressLine1: input.addressLine1.trim(),
        addressLine2: input.addressLine2?.trim(),
        landmark: input.landmark?.trim(),
        city: input.city.trim(),
        state: input.state.trim(),
        postalCode: input.postalCode.trim(),
        country: input.country,
        isDefault: input.isDefault,
      },
    });
  });
}

async function assertOwnership(addressId: string, userId: string) {
  const address = await addressRepository.findById(addressId);
  if (!address || address.userId !== userId) {
    throw new Error("ADDRESS_NOT_FOUND");
  }
  return address;
}

export async function updateAddress(addressId: string, userId: string, input: UpdateAddressInput) {
  await assertOwnership(addressId, userId);

  if (input.isDefault) {
    await addressRepository.unsetDefaultForUser(userId, addressId);
  }

  return addressRepository.update(addressId, {
    ...input,
    fullName: input.fullName?.trim(),
    phone: input.phone?.trim(),
    addressLine1: input.addressLine1?.trim(),
    addressLine2: input.addressLine2?.trim(),
    landmark: input.landmark?.trim(),
    city: input.city?.trim(),
    state: input.state?.trim(),
    postalCode: input.postalCode?.trim(),
    country: input.country?.trim(),
  });
}

export async function deactivateAddress(addressId: string, userId: string) {
  const address = await assertOwnership(addressId, userId);

  if (!address.isActive) {
    throw new Error("ADDRESS_ALREADY_INACTIVE");
  }

  return addressRepository.deactivate(addressId);
}

export async function setDefaultAddress(addressId: string, userId: string) {
  await assertOwnership(addressId, userId);

  await addressRepository.unsetDefaultForUser(userId, addressId);

  return addressRepository.update(addressId, { isDefault: true });
}