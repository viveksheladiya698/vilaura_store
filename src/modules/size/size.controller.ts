import { createSizeSchema, updateSizeSchema } from "./size.schema";
import { listSizes, createSize, updateSize, deactivateSize } from "./size.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function listSizesController() {
  try {
    const sizes = await listSizes();
    return Response.json({ success: true, data: sizes });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createSizeController(request: Request) {
  try {
    const body = await request.json();
    const validationResult = createSizeSchema.safeParse(body);

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

    const size = await createSize(validationResult.data);

    return Response.json(
      { success: true, message: "Size created successfully.", data: size },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}


export async function updateSizeController(request: Request, sizeId: string) {
  try {
    if (typeof sizeId !== "string" || sizeId.trim().length === 0) {
      return Response.json({ success: false, message: "Invalid size ID." }, { status: 400 });
    }

    const body = await request.json();
    const validationResult = updateSizeSchema.safeParse(body);

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

    const size = await updateSize(sizeId, validationResult.data);

    return Response.json({ success: true, message: "Size updated successfully.", data: size });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deactivateSizeController(sizeId: string) {
  try {
    if (typeof sizeId !== "string" || sizeId.trim().length === 0) {
      return Response.json({ success: false, message: "Invalid size ID." }, { status: 400 });
    }

    const size = await deactivateSize(sizeId);

    return Response.json({ success: true, message: "Size deactivated successfully.", data: size });
  } catch (error) {
    return handleApiError(error);
  }
}