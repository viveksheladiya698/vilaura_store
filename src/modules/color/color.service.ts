import { colorRepository } from "./color.repository";
import type { CreateColorInput, UpdateColorInput } from "./color.schema";

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

export async function updateColor(colorId: string, input: UpdateColorInput) {
  const existing = await colorRepository.findById(colorId);
  if (!existing) {
    throw new Error("COLOR_NOT_FOUND");
  }

  if (input.name) {
    const nameTaken = await colorRepository.findByNameExceptId(input.name, colorId);
    if (nameTaken) {
      throw new Error("COLOR_ALREADY_EXISTS");
    }
  }

  return colorRepository.update(colorId, input);
}

export async function deactivateColor(colorId: string) {
  const existing = await colorRepository.findById(colorId);
  if (!existing) {
    throw new Error("COLOR_NOT_FOUND");
  }

  if (!existing.isActive) {
    throw new Error("COLOR_ALREADY_INACTIVE");
  }

  return colorRepository.update(colorId, { isActive: false });
}