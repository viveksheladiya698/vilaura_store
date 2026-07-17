import { colorRepository } from "./color.repository";
import type { CreateColorInput } from "./color.schema";

export async function listColors() {
  return colorRepository.findAll();
}

export async function createColor(input: CreateColorInput) {
  const existing = await colorRepository.findByName(input.name);
  if (existing) {
    throw new Error("COLOR_ALREADY_EXISTS");
  }

  return colorRepository.create(input);
}