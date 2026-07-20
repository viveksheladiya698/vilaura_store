import { listPublicProductsController } from "@/modules/user/products/product.controller";

export async function POST(request: Request) {
  return listPublicProductsController(request);
}