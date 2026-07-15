import { categoryRepository } from "@/modules/category/category.repository";
import { productRepository } from "./product.reposetory";
import { createSlug } from "@/lib/slug"; 
import type { CreateProductInput } from "./product.schema";

export async function createProduct(input: CreateProductInput) {
  const category = await categoryRepository.findById(input.categoryId as any);
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
    images: input.images,
  });
}