import { requireUser } from "@/modules/user/require-user";
import { updateAddressController, deactivateAddressController } from "@/modules/user/address/address.controller";
import { handleApiError } from "@/lib/handle-api-error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    const user = await requireUser();
    const { addressId } = await params;
    return await updateAddressController(request, addressId, user.id);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    const user = await requireUser();
    const { addressId } = await params;
    return await deactivateAddressController(addressId, user.id);
  } catch (error) {
    return handleApiError(error);
  }
}