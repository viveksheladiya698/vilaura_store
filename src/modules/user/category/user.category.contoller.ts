import { usercategoryRepository } from "./user.category.reposetory";

export async function UserCategoryController(request: Request) {
    try {
        const category = await usercategoryRepository.findAll();
        return Response.json(
            {
                success: true,
                message: "User categories fetched successfully.",
                data: category,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user categories:", error);
        return Response.json(
            {
                success: false,
                message: "An unexpected error occurred.",
            },
            { status: 500 }
        );
    }
}

export async function GetUserCategoryById(id: string) {
    try {
        const categoryId = Number(id);
        if (!Number.isInteger(categoryId) || categoryId <= 0) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid category ID.",
                },
                { status: 400 }
            );
        }
        const category = await usercategoryRepository.findById(categoryId);
        if (!category) {
            return Response.json(
                {
                    success: false,
                    message: "Category not found.",
                },
                { status: 404 }
            );
        }
        return Response.json(
            {
                success: true,
                message: "User category fetched successfully.",
                data: category,
            },
            { status: 200 }
        );
    }
    catch (error) {
        console.error("Error fetching user category by ID:", error);
        return Response.json(
            {
                success: false,
                message: "An unexpected error occurred.",
            },
            { status: 500 }
        );
    }
}