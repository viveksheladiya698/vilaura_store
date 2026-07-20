import { requireUser } from "@/modules/user/require-user";
import { listAddressesController, createAddressController } from "@/modules/user/address/address.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function GET() {
  try {
    const user = await requireUser();
    return await listAddressesController(user.id);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    return await createAddressController(request, user.id);
  } catch (error) {
    return handleApiError(error);
  }
}