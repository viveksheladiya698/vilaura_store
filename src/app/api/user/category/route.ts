import { listPublicCategoriesController } from "@/modules/user/category/user.category.contoller";

export async function GET() {
  return listPublicCategoriesController();
}