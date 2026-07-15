import { requireAdmin } from "@/modules/auth/require-admin";
import { updateInventoryController } from "@/modules/inventory/inventory.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ variantId: string }> }
) {
  try {
    await requireAdmin();
    const { variantId } = await params;
    return await updateInventoryController(request, variantId);
  } catch (error) {
    return handleApiError(error);
  }
}