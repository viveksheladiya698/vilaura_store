import { publicCategoryRepository } from "./user.category.reposetory";

export async function listPublicCategories() {
  return publicCategoryRepository.findAllPublic();
}