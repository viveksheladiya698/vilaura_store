import { sizeRepository } from "./size.repository";
import type { CreateSizeInput } from "./size.schema";

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