import { createSizeSchema } from "./size.schema";
import { listSizes, createSize } from "./size.service";
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