import { publicProductRepository } from "./product.repository";
import type { PublicListProductsInput } from "./product.schema";

export async function listPublicProducts(input: PublicListProductsInput) {
  const skip = (input.page - 1) * input.limit;

  const [products, total] = await Promise.all([
    publicProductRepository.findPublic({
      skip,
      take: input.limit,
      search: input.search,
      categoryId: input.categoryId,
      categorySlug: input.categorySlug,
      gender: input.gender,
      minPrice: input.minPrice,
      maxPrice: input.maxPrice,
      sort: input.sort,
    }),
    publicProductRepository.countPublic({
      search: input.search,
      categoryId: input.categoryId,
      categorySlug: input.categorySlug,
      gender: input.gender,
      minPrice: input.minPrice,
      maxPrice: input.maxPrice,
    }),
  ]);

  const shaped = products.map((p) => ({
    id: p.id,
    productName: p.productName,
    slug: p.slug,
    price: p.price.toString(), // convert Decimal -> string
    gender: p.gender,
    category: p.category,
    primaryImage: p.images[0]?.imageUrl ?? null,
  }));

  return {
    products: shaped,
    pagination: {
      page: input.page,
      limit: input.limit,
      total,
      totalPages: Math.ceil(total / input.limit),
    },
  };
}

export async function getPublicProductBySlug(slug: string) {
  const product = await publicProductRepository.findBySlugPublic(slug);

  if (!product || product.variants.length === 0) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  const variants = product.variants.map((v) => ({
    id: v.id,
    sku: v.sku,
    price: (v.priceOverride ?? product.price).toString(), // convert Decimal -> string
    size: v.size,
    color: v.color,
    inStock: (v.inventory?.quantity ?? 0) > 0,
  }));

  return {
    id: product.id,
    productName: product.productName,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    price: product.price.toString(), // convert Decimal -> string
    gender: product.gender,
    category: product.category,
    images: product.images,
    variants,
  };
}