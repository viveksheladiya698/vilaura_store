import { addVariantSchema } from "./variant.schema";
import { addVariant } from "./variant.service";
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