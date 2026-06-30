import { uploadCategoryImage } from "@/lib/upload-image";
import { categoryRepository, } from "./category.repository";
import type { CreateCategoryInput, UpdateCategoryInput, updateCategorySchema } from "./category.schema";

function createSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createCategory(
  input: CreateCategoryInput,
  imageFile?: File
) {
  const name = input.name.trim();

  const existingCategory =
    await categoryRepository.findByName(name);

  if (existingCategory) {
    throw new Error("CATEGORY_ALREADY_EXISTS");
  }

  const slug = createSlug(name);

  if (!slug) {
    throw new Error("INVALID_CATEGORY_SLUG");
  }

  const existingSlug =
    await categoryRepository.findBySlug(slug);

  if (existingSlug) {
    throw new Error("CATEGORY_SLUG_ALREADY_EXISTS");
  }

  let imagePath: string | undefined;

  if (imageFile && imageFile.size > 0) {
    imagePath = await uploadCategoryImage(imageFile);
  }

  return categoryRepository.create({
    name,
    slug,
    description: input.description?.trim() || undefined,
    image: imagePath,
  });
}

export async function getAllCategories() {
  return categoryRepository.findAll();
}

export async function updateCategory(
  id: number,
  input: UpdateCategoryInput,
  imageFile?: File
) {
  const existingCategory =
    await categoryRepository.findById(id);

  if (!existingCategory) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  let name: string | undefined;
  let slug: string | undefined;

  if (input.name !== undefined) {
    name = input.name.trim();

    const duplicateName =
      await categoryRepository.findByNameExceptId(name, id);

    if (duplicateName) {
      throw new Error("CATEGORY_ALREADY_EXISTS");
    }

    slug = createSlug(name);

    if (!slug) {
      throw new Error("INVALID_CATEGORY_SLUG");
    }

    const duplicateSlug =
      await categoryRepository.findBySlugExceptId(slug, id);

    if (duplicateSlug) {
      throw new Error("CATEGORY_SLUG_ALREADY_EXISTS");
    }
  }

  let imagePath: string | undefined;

  if (imageFile && imageFile.size > 0) {
    imagePath = await uploadCategoryImage(imageFile);
  }

  return categoryRepository.update(id, {
    name,
    slug,
    description:
      input.description !== undefined
        ? input.description.trim() || null
        : undefined,
    image: imagePath,
    isActive: input.isActive,
  });
}

export async function deactivateCategory(id: number) {
  const category = await categoryRepository.findById(id);

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  if (!category.isActive) {
    throw new Error("CATEGORY_ALREADY_INACTIVE");
  }

  return categoryRepository.deactivate(id);
}