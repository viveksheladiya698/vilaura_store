import { createCategorySchema, updateCategorySchema } from "./category.schema";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deactivateCategory,
  getCategorybyId,
  getCategoryBySlug,
} from "./category.service";
import { handleApiError } from "@/lib/handle-api-error";

export async function createCategoryController(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const imageValue = formData.get("image");

    const validationResult = createCategorySchema.safeParse({
      name,
      description:
        typeof description === "string" && description.trim().length > 0
          ? description
          : undefined,
    });

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

    let imageFile: File | undefined;

    if (imageValue instanceof File && imageValue.size > 0) {
      imageFile = imageValue;
    }

    const category = await createCategory(validationResult.data, imageFile);

    return Response.json(
      {
        success: true,
        message: "Category created successfully.",
        data: category,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getCategoriesController() {
  try {
    const categories = await getAllCategories();

    return Response.json(
      {
        success: true,
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateCategoryController(
  request: Request,
  categoryId: string
) {
  try {
    if (typeof categoryId !== "string" || categoryId.trim().length === 0) {
      return Response.json(
        { success: false, message: "Invalid category ID." },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const isActiveValue = formData.get("isActive");
    const imageValue = formData.get("image");

    const validationResult = updateCategorySchema.safeParse({
      name: typeof name === "string" && name.trim() ? name : undefined,

      description: typeof description === "string" ? description : undefined,

      isActive:
        isActiveValue === "true"
          ? true
          : isActiveValue === "false"
          ? false
          : undefined,
    });

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

    let imageFile: File | undefined;

    if (imageValue instanceof File && imageValue.size > 0) {
      imageFile = imageValue;
    }

    const category = await updateCategory(
      categoryId,
      validationResult.data,
      imageFile
    );

    return Response.json({
      success: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deactivateCategoryController(categoryId: string) {
  try {
    if (typeof categoryId !== "string" || categoryId.trim().length === 0) {
      return Response.json(
        { success: false, message: "Invalid category ID." },
        { status: 400 }
      );
    }

    const category = await deactivateCategory(categoryId);

    return Response.json({
      success: true,
      message: "Category deactivated successfully.",
      data: category,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getCategoryControllerById(categoryId: string) {
  try {
    if (typeof categoryId !== "string" || categoryId.trim().length === 0) {
      return Response.json(
        { success: false, message: "Invalid category ID." },
        { status: 400 }
      );
    }

    const category = await getCategorybyId(categoryId);

    return Response.json({
      success: true,
      message: "Category retrieved successfully.",
      data: category,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getCategoryControllerBySlug(slug: string) {
  try {
    const category = await getCategoryBySlug(slug);

    return Response.json({
      success: true,
      message: "Category retrieved successfully.",
      data: category,
    });
  } catch (error) {
    return handleApiError(error);
  }
}