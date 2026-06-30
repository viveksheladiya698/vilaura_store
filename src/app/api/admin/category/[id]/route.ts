import {
  deactivateCategoryController,
  updateCategoryController,
} from "@/modules/category/category.controller";
import { requireAdmin } from "@/modules/auth/require-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function handleAdminError(error: unknown) {
  if (
    error instanceof Error &&
    (
      error.message === "UNAUTHENTICATED" ||
      error.message === "INVALID_SESSION"
    )
  ) {
    return Response.json(
      {
        success: false,
        message: "Authentication required.",
      },
      { status: 401 }
    );
  }

  if (
    error instanceof Error &&
    (
      error.message === "FORBIDDEN" ||
      error.message === "EMPLOYEE_INACTIVE"
    )
  ) {
    return Response.json(
      {
        success: false,
        message: "You are not authorized.",
      },
      { status: 403 }
    );
  }

  console.error("Admin authorization failed:", error);

  return Response.json(
    {
      success: false,
      message: "An unexpected error occurred.",
    },
    { status: 500 }
  );
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    return updateCategoryController(request, id);
  } catch (error) {
    return handleAdminError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    await requireAdmin();

    const { id } = await context.params;

    return deactivateCategoryController(id);
  } catch (error) {
    return handleAdminError(error);
  }
}