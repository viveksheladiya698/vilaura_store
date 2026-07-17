import { requireAdmin } from "@/modules/auth/require-admin";
import { updateVariantController } from "@/modules/variant/variant.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ variantId: string }> }
) {
  try {
    await requireAdmin();
    const { variantId } = await params;
    return await updateVariantController(request, variantId);
  } catch (error) {
    return handleApiError(error);
  }
}

