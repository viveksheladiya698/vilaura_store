import { getPublicProductBySlugController } from "@/modules/user/products/product.controller";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return getPublicProductBySlugController(slug);
}