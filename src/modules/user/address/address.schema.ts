import { z } from "zod";
import { AddressType } from "@/generated/prisma/client";

export const createAddressSchema = z
  .object({
    type: z.nativeEnum(AddressType, { error: "Invalid address type." }).optional().default("HOME"),
    label: z.string().trim().max(50).optional(),
    fullName: z.string({ error: "Full name is required." }).trim().min(2).max(100),
    phone: z
      .string({ error: "Phone number is required." })
      .trim()
      .regex(/^[0-9]{10}$/, "Phone number must be a valid 10-digit number."),
    addressLine1: z.string({ error: "Address line 1 is required." }).trim().min(5).max(200),
    addressLine2: z.string().trim().max(200).optional(),
    landmark: z.string().trim().max(100).optional(),
    city: z.string({ error: "City is required." }).trim().min(2).max(100),
    state: z.string({ error: "State is required." }).trim().min(2).max(100),
    postalCode: z
      .string({ error: "Postal code is required." })
      .trim()
      .regex(/^[0-9]{6}$/, "Postal code must be a valid 6-digit code."),
    country: z.string().trim().min(2).max(100).optional().default("India"),
    isDefault: z.boolean().optional().default(false),
  })
  .strict();

export type CreateAddressInput = z.infer<typeof createAddressSchema>;

export const updateAddressSchema = z
  .object({
    type: z.nativeEnum(AddressType).optional(),
    label: z.string().trim().max(50).optional(),
    fullName: z.string().trim().min(2).max(100).optional(),
    phone: z.string().trim().regex(/^[0-9]{10}$/, "Phone number must be a valid 10-digit number.").optional(),
    addressLine1: z.string().trim().min(5).max(200).optional(),
    addressLine2: z.string().trim().max(200).optional(),
    landmark: z.string().trim().max(100).optional(),
    city: z.string().trim().min(2).max(100).optional(),
    state: z.string().trim().min(2).max(100).optional(),
    postalCode: z.string().trim().regex(/^[0-9]{6}$/, "Postal code must be a valid 6-digit code.").optional(),
    country: z.string().trim().min(2).max(100).optional(),
    isDefault: z.boolean().optional(),
  })
  .strict();

export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;