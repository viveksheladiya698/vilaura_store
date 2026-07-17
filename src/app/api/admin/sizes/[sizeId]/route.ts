import { requireAdmin } from "@/modules/auth/require-admin";
import { updateSizeController, deactivateSizeController } from "@/modules/size/size.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ sizeId: string }> }
) {
  try {
    await requireAdmin();
    const { sizeId } = await params;
    return await updateSizeController(request, sizeId);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ sizeId: string }> }
) {
  try {
    await requireAdmin();
    const { sizeId } = await params;
    return await deactivateSizeController(sizeId);
  } catch (error) {
    return handleApiError(error);
  }
}