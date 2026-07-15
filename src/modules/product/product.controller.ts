import { createProductSchema } from "./product.schema";
import { createProduct } from "./product.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function createProductController(request: Request) {
  try {
    const body = await request.json();

    const validationResult = createProductSchema.safeParse(body);

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

    const product = await createProduct(validationResult.data);

    return Response.json(
      { success: true, message: "Product created successfully.", data: product },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}