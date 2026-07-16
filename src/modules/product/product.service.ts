import { categoryRepository } from "@/modules/category/category.repository";
import { productRepository } from "./product.reposetory";
import { createSlug } from "@/lib/slug";
import type { CreateProductInput, ProductImageMeta, UpdateProductInput } from "./product.schema";

type UploadedImage = ProductImageMeta & { imageUrl: string };

export async function createProduct(input: CreateProductInput, images: UploadedImage[]) {
  const category = await categoryRepository.findById(input?.categoryId);
  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const productName = input.productName.trim();
  const baseSlug = await createSlug(productName);

  if (!baseSlug) {
    throw new Error("INVALID_PRODUCT_SLUG");
  }

  let slug = baseSlug;
  const existing = await productRepository.findBySlug(slug);
  if (existing) {
    slug = `${baseSlug}-${Date.now().toString(36)}`;
  }

  return productRepository.create({
    categoryId: input.categoryId,
    productName,
    slug,
    shortDescription: input.shortDescription?.trim() || undefined,
    description: input.description?.trim() || undefined,
    price: input.price,
    gender: input.gender,
    images,
  });
}

export async function updateProduct(
  productId: string,
  input: UpdateProductInput,
  newImages: UploadedImage[]
) {
  const existing = await productRepository.findById(productId);
  if (!existing) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (input.categoryId) {
    const category = await categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
  }

  let slug: string | undefined;

  if (input.productName && input.productName.trim() !== existing.productName) {
    const baseSlug = await createSlug(input.productName.trim());
    if (!baseSlug) {
      throw new Error("INVALID_PRODUCT_SLUG");
    }

    const slugTaken = await productRepository.findBySlugExceptId(baseSlug, productId);
    slug = slugTaken ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;
  }

  // ---- remove requested images first ----
  if (input.imagesToDelete && input.imagesToDelete.length > 0) {
    await productRepository.deleteImages(productId, input.imagesToDelete);
  }

  // ---- add any newly uploaded images ----
  if (newImages.length > 0) {
    await productRepository.addImages(productId, newImages);
  }

  // ---- update scalar fields ----
  const updated = await productRepository.update(productId, {
    categoryId: input.categoryId,
    productName: input.productName?.trim(),
    slug,
    shortDescription: input.shortDescription !== undefined ? input.shortDescription.trim() || null : undefined,
    description: input.description !== undefined ? input.description.trim() || null : undefined,
    price: input.price,
    gender: input.gender,
    isActive: input.isActive,
  });

  return updated;
}