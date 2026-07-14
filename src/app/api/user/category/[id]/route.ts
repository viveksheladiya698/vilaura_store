import { GetUserCategoryById, UserCategoryController } from "@/modules/user/category/user.category.contoller";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        return GetUserCategoryById(id);
    }
    catch (error) {
        return handleAdminError(error);
    }
}

function handleAdminError(error: unknown) {
    if (error instanceof Error) {
        if (
            error.message === "UNAUTHENTICATED" ||
            error.message === "INVALID_SESSION" ||
            error.message === "USER_INACTIVE"
        ) {
            return Response.json(
                {
                    success: false,
                    message: "Authentication required.",
                },
                { status: 401 }
            );
        }
    }
}