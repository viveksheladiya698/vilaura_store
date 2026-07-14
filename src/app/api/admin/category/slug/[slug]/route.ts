import { requireAdmin } from "@/modules/auth/require-admin";
import { getCategoryControllerBySlug } from "@/modules/category/category.controller";

type RouteContext = {
  params: Promise<{
    slug: string;
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

export async function GET(
    _request: Request,
    context: RouteContext
){
    try {
      console.log("call");
      
        await requireAdmin();
        const { slug } = await context.params;
        return getCategoryControllerBySlug(slug);
    } catch (error) {
        return handleAdminError(error);
    }
}