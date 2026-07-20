import { prisma } from "@/lib/prisma";
import { AddressType } from "@/generated/prisma/client";

type AddressData = {
  type: AddressType;
  label?: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export const addressRepository = {
  findAllByUser(userId: string) {
    return prisma.address.findMany({
      where: { userId, isActive: true },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
  },

  findById(id: string) {
    return prisma.address.findUnique({ where: { id } });
  },

  create(userId: string, data: AddressData) {
    return prisma.address.create({
      data: { userId, ...data },
    });
  },

  update(id: string, data: Partial<AddressData>) {
    return prisma.address.update({ where: { id }, data });
  },

  unsetDefaultForUser(userId: string, exceptId?: string) {
    return prisma.address.updateMany({
      where: { userId, isDefault: true, ...(exceptId ? { NOT: { id: exceptId } } : {}) },
      data: { isDefault: false },
    });
  },

  deactivate(id: string) {
    return prisma.address.update({ where: { id }, data: { isActive: false } });
  },
};