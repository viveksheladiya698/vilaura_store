import { productRepository } from "@/modules/product/product.reposetory";
import { sizeRepository } from "@/modules/size/size.repository";
import { colorRepository } from "@/modules/color/color.repository";
import { variantRepository } from "./variant.repository";
import type { AddVariantInput } from "./variant.schema";

export async function addVariant(productId: string, input: AddVariantInput) {
  const product = await productRepository.findById(productId);
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  const size = await sizeRepository.findById(input.sizeId);
  if (!size || !size.isActive) {
    throw new Error("SIZE_NOT_FOUND");
  }

  const color = await colorRepository.findById(input.colorId);
  if (!color || !color.isActive) {
    throw new Error("COLOR_NOT_FOUND");
  }

  const existingCombo = await variantRepository.findByProductSizeColor(
    productId,
    input.sizeId,
    input.colorId
  );
  if (existingCombo) {
    throw new Error("VARIANT_COMBINATION_EXISTS");
  }

  const existingSku = await variantRepository.findBySku(input.sku.trim());
  if (existingSku) {
    throw new Error("SKU_ALREADY_EXISTS");
  }

  return variantRepository.create(productId, {
    sizeId: input.sizeId,
    colorId: input.colorId,
    sku: input.sku.trim(),
    priceOverride: input.priceOverride,
    quantity: input.quantity,
    lowStockThreshold: input.lowStockThreshold,
  });
}