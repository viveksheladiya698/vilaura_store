import { requireUser } from "@/modules/user/require-user";
import { setDefaultAddressController } from "@/modules/user/address/address.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    const user = await requireUser();
    const { addressId } = await params;
    return await setDefaultAddressController(addressId, user.id);
  } catch (error) {
    return handleApiError(error);
  }
}