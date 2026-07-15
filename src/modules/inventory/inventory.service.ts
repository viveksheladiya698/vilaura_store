import { inventoryRepository } from "./inventory.repository";
import type { UpdateInventoryInput } from "./inventory.schema";

export async function updateStock(variantId: string, input: UpdateInventoryInput) {
  const inventory = await inventoryRepository.findByVariantId(variantId);
  if (!inventory) {
    throw new Error("INVENTORY_NOT_FOUND");
  }

  const newQuantity = input.mode === "set" ? input.value : inventory.quantity + input.value;

  if (newQuantity < 0) {
    throw new Error("INSUFFICIENT_STOCK");
  }

  return inventoryRepository.update(variantId, {
    quantity: newQuantity,
    ...(input.lowStockThreshold !== undefined ? { lowStockThreshold: input.lowStockThreshold } : {}),
  });
}