import { updateInventorySchema } from "./inventory.schema";
import { updateStock } from "./inventory.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function updateInventoryController(request: Request, variantId: string) {
  try {
    const body = await request.json();

    const validationResult = updateInventorySchema.safeParse(body);

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

    const inventory = await updateStock(variantId, validationResult.data);

    return Response.json(
      { success: true, message: "Stock updated successfully.", data: inventory },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}