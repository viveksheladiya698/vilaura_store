import { requireAdmin } from "@/modules/auth/require-admin";
import { updateColorController, deactivateColorController } from "@/modules/color/color.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ colorId: string }> }
) {
  try {
    await requireAdmin();
    const { colorId } = await params;
    return await updateColorController(request, colorId);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ colorId: string }> }
) {
  try {
    await requireAdmin();
    const { colorId } = await params;
    return await deactivateColorController(colorId);
  } catch (error) {
    return handleApiError(error);
  }
}