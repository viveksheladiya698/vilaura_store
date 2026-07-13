import {
  createCategoryController,
  getCategoriesController,
} from "@/modules/category/category.controller";

import { requireAdmin } from "@/modules/auth/require-admin";

function handleAuthError(error: unknown) {
  if (error instanceof Error) {
    if (
      error.message === "UNAUTHENTICATED" ||
      error.message === "INVALID_SESSION"
    ) {
      return Response.json(
        {
          success: false,
          message: "Auhentication required.",
        },
        { status: 401 }
      );
    }

    if (
      error.message === "FORBIDDEN" ||
      error.message === "EMPLOYEE_INACTIVE"
    ) {
      return Response.json(
        {
          success: false,
          message: "You are not authorized to perform this action.",
        },
        { status: 403 }
      );
    }
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

export async function POST(request: Request) {
  try {
    await requireAdmin();
    return createCategoryController(request);
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function GET() {
  try {
    await requireAdmin();

    return getCategoriesController();
  } catch (error) {
    return handleAuthError(error);
  }
}