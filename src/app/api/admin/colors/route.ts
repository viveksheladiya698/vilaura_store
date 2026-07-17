import { requireAdmin } from "@/modules/auth/require-admin";
import { listColorsController, createColorController } from "@/modules/color/color.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function GET() {
  try {
    await requireAdmin();
    return await listColorsController();
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    return await createColorController(request);
  } catch (error) {
    return handleApiError(error);
  }
}