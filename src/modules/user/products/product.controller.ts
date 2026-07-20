import { publicListProductsSchema } from "./product.schema";
import { listPublicProducts, getPublicProductBySlug } from "./product.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function listPublicProductsController(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const validationResult = publicListProductsSchema.safeParse(body);

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

    const result = await listPublicProducts(validationResult.data);

    return Response.json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getPublicProductBySlugController(slug: string) {
  try {
    if (typeof slug !== "string" || slug.trim().length === 0) {
      return Response.json({ success: false, message: "Invalid product slug." }, { status: 400 });
    }

    const product = await getPublicProductBySlug(slug);

    return Response.json({ success: true, data: product });
  } catch (error) {
    return handleApiError(error);
  }
}