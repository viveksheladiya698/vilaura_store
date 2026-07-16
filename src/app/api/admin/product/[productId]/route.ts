// app/api/admin/products/[productId]/route.ts
import { requireAdmin } from "@/modules/auth/require-admin";
import { getProductByIdController, updateProductController } from "@/modules/product/product.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    await requireAdmin();
    const { productId } = await params;
    return await updateProductController(request, productId);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    await requireAdmin();
    const { productId } = await params;
    return await getProductByIdController(productId);
  } catch (error) {
    return handleApiError(error);
  }
}