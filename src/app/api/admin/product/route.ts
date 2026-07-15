import { requireAdmin } from "@/modules/auth/require-admin";
import { createProductController } from "@/modules/product/product.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    return await createProductController(request);
  } catch (error) {
    return handleApiError(error);
  }
}