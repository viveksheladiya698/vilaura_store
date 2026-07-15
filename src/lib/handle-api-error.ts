// src/lib/handle-api-error.ts
import { Prisma } from "@/generated/prisma/client";

type ErrorMapEntry = {
  status: number;
  message: string;
};


const ERROR_MAP: Record<string, ErrorMapEntry> = {
  // ---- auth ----
  UNAUTHENTICATED: { status: 401, message: "Authentication required." },
  INVALID_SESSION: { status: 401, message: "Authentication required." },
  FORBIDDEN: { status: 403, message: "You are not authorized to perform this action." },
  EMPLOYEE_INACTIVE: { status: 403, message: "You are not authorized to perform this action." },

  // ---- category ----
  CATEGORY_ALREADY_EXISTS: { status: 409, message: "A category with this name already exists." },
  CATEGORY_SLUG_ALREADY_EXISTS: { status: 409, message: "A category with this slug already exists." },
  INVALID_CATEGORY_SLUG: { status: 400, message: "The category name cannot produce a valid slug." },
  CATEGORY_NOT_FOUND: { status: 404, message: "Category not found." },
  CATEGORY_ALREADY_INACTIVE: { status: 409, message: "Category is already inactive." },

  // ---- product ----
  PRODUCT_NOT_FOUND: { status: 404, message: "Product not found." },
  PRODUCT_SLUG_ALREADY_EXISTS: { status: 409, message: "A product with this slug already exists." },
  INVALID_PRODUCT_SLUG: { status: 400, message: "The product name cannot produce a valid slug." },

  // ---- variant ----
  SIZE_NOT_FOUND: { status: 404, message: "Selected size does not exist or is inactive." },
  COLOR_NOT_FOUND: { status: 404, message: "Selected color does not exist or is inactive." },
  VARIANT_COMBINATION_EXISTS: { status: 409, message: "This size and color combination already exists for this product." },
  SKU_ALREADY_EXISTS: { status: 409, message: "A variant with this SKU already exists." },
  VARIANT_NOT_FOUND: { status: 404, message: "Variant not found." },

  // ---- inventory ----
  INVENTORY_NOT_FOUND: { status: 404, message: "Inventory record not found for this variant." },
  INSUFFICIENT_STOCK: { status: 400, message: "This operation would result in negative stock." },

  // ---- image upload (shared with category) ----
  INVALID_IMAGE_TYPE: { status: 400, message: "Only JPEG, PNG and WebP images are allowed." },
  EMPTY_IMAGE: { status: 400, message: "The selected image is empty." },
  IMAGE_TOO_LARGE: { status: 400, message: "Image size cannot exceed 10 MB." },
  INVALID_IMAGE_METADATA: { status: 400, message: "Invalid image metadata provided." },
};

export function handleApiError(error: unknown): Response {
  // 1. Known, mapped application errors (thrown as `new Error("CODE")` from any service)
  if (error instanceof Error && ERROR_MAP[error.message]) {
    const { status, message } = ERROR_MAP[error.message];
    return Response.json({ success: false, message }, { status });
  }

  // 2. Prisma-level errors that slipped through service-layer checks
  //    (acts as a backstop against race conditions on unique constraints)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = (error.meta?.target as string[] | undefined)?.join(", ") ?? "field";
      return Response.json(
        { success: false, message: `A record with this ${target} already exists.` },
        { status: 409 }
      );
    }
    if (error.code === "P2025") {
      return Response.json(
        { success: false, message: "The requested record was not found." },
        { status: 404 }
      );
    }
  }

  // 3. Anything unexpected
  console.error("Unhandled API error:", error);
  return Response.json(
    { success: false, message: "An unexpected error occurred." },
    { status: 500 }
  );
}