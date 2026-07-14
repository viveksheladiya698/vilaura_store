import { createCategorySchema, updateCategorySchema } from "./category.schema";
import { createCategory, getAllCategories, updateCategory, deactivateCategory, getCategorybyId, getCategoryBySlug } from "./category.service";

export async function createCategoryController(
  request: Request
) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const imageValue = formData.get("image");

    const validationResult = createCategorySchema.safeParse({
      name,
      description:
        typeof description === "string" &&
          description.trim().length > 0
          ? description
          : undefined,
    });

    if (!validationResult.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed.",
          errors:
            validationResult.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    let imageFile: File | undefined;

    if (imageValue instanceof File && imageValue.size > 0) {
      imageFile = imageValue;
    }

    const category = await createCategory(
      validationResult.data,
      imageFile
    );

    return Response.json(
      {
        success: true,
        message: "Category created successfully.",
        data: category,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "INVALID_IMAGE_TYPE") {
        return Response.json(
          {
            success: false,
            message:
              "Only JPEG, PNG and WebP images are allowed.",
          },
          {
            status: 400,
          }
        );
      }

      if (error.message === "EMPTY_IMAGE") {
        return Response.json(
          {
            success: false,
            message: "The selected image is empty.",
          },
          {
            status: 400,
          }
        );
      }

      if (error.message === "IMAGE_TOO_LARGE") {
        return Response.json(
          {
            success: false,
            message: "Image size cannot exceed 10 MB.",
          },
          {
            status: 400,
          }
        );
      }

      if (error.message === "CATEGORY_ALREADY_EXISTS") {
        return Response.json(
          {
            success: false,
            message:
              "A category with this name already exists.",
          },
          {
            status: 409,
          }
        );
      }

      if (
        error.message === "CATEGORY_SLUG_ALREADY_EXISTS"
      ) {
        return Response.json(
          {
            success: false,
            message:
              "A category with this slug already exists.",
          },
          {
            status: 409,
          }
        );
      }

      if (error.message === "INVALID_CATEGORY_SLUG") {
        return Response.json(
          {
            success: false,
            message:
              "The category name cannot produce a valid slug.",
          },
          {
            status: 400,
          }
        );
      }
    }

    console.error("Category creation failed:", error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred.",
      },
      {
        status: 500,
      }
    );
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
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Category listing failed:", error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function updateCategoryController(
  request: Request,
  categoryId: string
) {
  try {
    const id = Number(categoryId);

    if (!Number.isInteger(id) || id <= 0) {
      return Response.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const isActiveValue = formData.get("isActive");
    const imageValue = formData.get("image");

    const validationResult = updateCategorySchema.safeParse({
      name:
        typeof name === "string" && name.trim()
          ? name
          : undefined,

      description:
        typeof description === "string"
          ? description
          : undefined,

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
          errors:
            validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    let imageFile: File | undefined;

    if (imageValue instanceof File && imageValue.size > 0) {
      imageFile = imageValue;
    }

    const category = await updateCategory(
      id,
      validationResult.data,
      imageFile
    );

    return Response.json({
      success: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    return handleCategoryError(error, "update");
  }
}

export async function deactivateCategoryController(
  categoryId: string
) {
  try {
    const id = Number(categoryId);

    if (!Number.isInteger(id) || id <= 0) {
      return Response.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        { status: 400 }
      );
    }

    const category = await deactivateCategory(id);

    return Response.json({
      success: true,
      message: "Category deactivated successfully.",
      data: category,
    });
  } catch (error) {
    return handleCategoryError(error, "deactivate");
  }
}

export async function getCategoryControllerById(
  categoryId: string
) {
  try {
    const id = Number(categoryId);

    if (!Number.isInteger(id) || id <= 0) {
      return Response.json(
        {
          success: false,
          message: "Invalid category ID.",
        },
        { status: 400 }
      );
    }

    const category = await getCategorybyId(id);

    return Response.json({
      success: true,
      message: "Category retrieved successfully.",
      data: category,
    });
  } catch (error) {
    return handleCategoryError(error, "get");
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
    return handleCategoryError(error, "get");
  }
}

function handleCategoryError(
  error: unknown,
  action: string
) {
  if (error instanceof Error) {
    const errorResponses: Record<
      string,
      { message: string; status: number }
    > = {
      CATEGORY_NOT_FOUND: {
        message: "Category not found.",
        status: 404,
      },
      CATEGORY_ALREADY_EXISTS: {
        message: "A category with this name already exists.",
        status: 409,
      },
      CATEGORY_SLUG_ALREADY_EXISTS: {
        message: "A category with this slug already exists.",
        status: 409,
      },
      INVALID_CATEGORY_SLUG: {
        message: "The category name cannot produce a valid slug.",
        status: 400,
      },
      CATEGORY_ALREADY_INACTIVE: {
        message: "Category is already inactive.",
        status: 409,
      },
      INVALID_IMAGE_TYPE: {
        message: "Only JPEG, PNG and WebP images are allowed.",
        status: 400,
      },
      IMAGE_TOO_LARGE: {
        message: "Image size cannot exceed 10 MB.",
        status: 400,
      },
      EMPTY_IMAGE: {
        message: "The selected image is empty.",
        status: 400,
      },
    };

    const response = errorResponses[error.message];

    if (response) {
      return Response.json(
        {
          success: false,
          message: response.message,
        },
        { status: response.status }
      );
    }
  }

  console.error(`Category ${action} failed:`, error);

  return Response.json(
    {
      success: false,
      message: "An unexpected error occurred.",
    },
    { status: 500 }
  );
}