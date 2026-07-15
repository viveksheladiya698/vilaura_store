import { requireAdmin } from "@/modules/auth/require-admin";
import { addVariantController } from "@/modules/variant/variant.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    await requireAdmin();
    const { productId } = await params;
    return await addVariantController(request, productId);
  } catch (error) {
    return handleApiError(error);
  }
}