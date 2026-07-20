import { listPublicCategories } from "./category.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function listPublicCategoriesController() {
  try {
    const categories = await listPublicCategories();
    return Response.json({ success: true, data: categories });
  } catch (error) {
    return handleApiError(error);
  }
}