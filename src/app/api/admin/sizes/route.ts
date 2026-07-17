import { requireAdmin } from "@/modules/auth/require-admin";
import { listSizesController, createSizeController } from "@/modules/size/size.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function GET() {
  try {
    await requireAdmin();
    return await listSizesController();
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    return await createSizeController(request);
  } catch (error) {
    return handleApiError(error);
  }
}