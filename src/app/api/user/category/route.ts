import { UserCategoryController } from "@/modules/user/category/user.category.contoller";

export async function GET(request: Request) {
    try{
        return UserCategoryController(request);
    }catch(error){
        return handleAuthError(error);
    }
}

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
    }
}