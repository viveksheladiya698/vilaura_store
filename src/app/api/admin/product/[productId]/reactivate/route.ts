import { requireAdmin } from "@/modules/auth/require-admin";
import { reactivateProductController } from "@/modules/product/product.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    await requireAdmin();
    const { productId } = await params;
    return await reactivateProductController(productId);
  } catch (error) {
    return handleApiError(error);
  }
}