import { addVariantSchema, updateVariantSchema } from "./variant.schema";
import { addVariant, updateVariant } from "./variant.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function addVariantController(request: Request, productId: string) {
  try {
    const body = await request.json();

    const validationResult = addVariantSchema.safeParse(body);

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

    const variant = await addVariant(productId, validationResult.data);

    return Response.json(
      { success: true, message: "Variant added successfully.", data: variant },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateVariantController(request: Request, variantId: string) {
  try {
    if (typeof variantId !== "string" || variantId.trim().length === 0) {
      return Response.json({ success: false, message: "Invalid variant ID." }, { status: 400 });
    }

    const body = await request.json();
    const validationResult = updateVariantSchema.safeParse(body);

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

    const variant = await updateVariant(variantId, validationResult.data);

    return Response.json({
      success: true,
      message: "Variant updated successfully.",
      data: variant,
    });
  } catch (error) {
    return handleApiError(error);
  }
}