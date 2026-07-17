import { createColorSchema } from "./color.schema";
import { listColors, createColor } from "./color.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function listColorsController() {
  try {
    const colors = await listColors();
    return Response.json({ success: true, data: colors });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createColorController(request: Request) {
  try {
    const body = await request.json();
    const validationResult = createColorSchema.safeParse(body);

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

    const color = await createColor(validationResult.data);

    return Response.json(
      { success: true, message: "Color created successfully.", data: color },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}