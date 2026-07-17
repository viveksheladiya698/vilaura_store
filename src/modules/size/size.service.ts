import { sizeRepository } from "./size.repository";
import type { CreateSizeInput, UpdateSizeInput } from "./size.schema";

export async function listSizes() {
  return sizeRepository.findAll();
}

export async function createSize(input: CreateSizeInput) {
  const existing = await sizeRepository.findByName(input.name);
  if (existing) {
    throw new Error("SIZE_ALREADY_EXISTS");
  }

  return sizeRepository.create(input);
}

export async function updateSize(sizeId: string, input: UpdateSizeInput) {
  const existing = await sizeRepository.findById(sizeId);
  if (!existing) {
    throw new Error("SIZE_NOT_FOUND");
  }

  if (input.name) {
    const nameTaken = await sizeRepository.findByNameExceptId(input.name, sizeId);
    if (nameTaken) {
      throw new Error("SIZE_ALREADY_EXISTS");
    }
  }

  return sizeRepository.update(sizeId, input);
}

export async function deactivateSize(sizeId: string) {
  const existing = await sizeRepository.findById(sizeId);
  if (!existing) {
    throw new Error("SIZE_NOT_FOUND");
  }

  if (!existing.isActive) {
    throw new Error("SIZE_ALREADY_INACTIVE");
  }

  return sizeRepository.update(sizeId, { isActive: false });
}