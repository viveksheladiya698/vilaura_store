import { requireUser } from "@/modules/user/require-user";
import { getProfileController, updateProfileController } from "@/modules/user/profile/profile.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function GET() {
  try {
    const user = await requireUser();
    return await getProfileController(user.id);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireUser();
    return await updateProfileController(request, user.id);
  } catch (error) {
    return handleApiError(error);
  }
}