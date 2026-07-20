import { createAddressSchema, updateAddressSchema } from "./address.schema";
import {
  listAddresses,
  createAddress,
  updateAddress,
  deactivateAddress,
  setDefaultAddress,
} from "./address.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function listAddressesController(userId: string) {
  try {
    const addresses = await listAddresses(userId);
    return Response.json({ success: true, data: addresses });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createAddressController(request: Request, userId: string) {
  try {
    const body = await request.json();
    const validationResult = createAddressSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const address = await createAddress(userId, validationResult.data);

    return Response.json(
      { success: true, message: "Address added successfully.", data: address },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateAddressController(request: Request, addressId: string, userId: string) {
  try {
    const body = await request.json();
    const validationResult = updateAddressSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const address = await updateAddress(addressId, userId, validationResult.data);

    return Response.json({ success: true, message: "Address updated successfully.", data: address });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deactivateAddressController(addressId: string, userId: string) {
  try {
    const address = await deactivateAddress(addressId, userId);
    return Response.json({ success: true, message: "Address removed successfully.", data: address });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function setDefaultAddressController(addressId: string, userId: string) {
  try {
    const address = await setDefaultAddress(addressId, userId);
    return Response.json({ success: true, message: "Default address updated.", data: address });
  } catch (error) {
    return handleApiError(error);
  }
}