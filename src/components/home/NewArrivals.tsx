import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Product = {
  id: string;
  productName: string;
  slug: string;
  price: string;
  primaryImage: string | null;
};

export function NewArrivals({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-ink">New Arrivals</h2>
          <Link href="/products?sort=newest" className="text-sm font-medium text-ink hover:text-accent-dark">
            View all products →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((p) => (
            <div key={p.id} className="group">
              <Link href={`/products/${p.slug}`}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-cream">
                  <span className="absolute top-2 left-2 z-10 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-ink">
                    New
                  </span>
                  <Image
                    src={p.primaryImage ?? "/images/placeholders/product-placeholder.jpg"}
                    alt={p.productName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 16vw, 33vw"
                  />
                </div>
              </Link>
              <div className="mt-2 flex items-start justify-between gap-2">
                <div>
                  <Link href={`/products/${p.slug}`}>
                    <p className="text-sm font-medium text-ink line-clamp-1">{p.productName}</p>
                  </Link>
                  <p className="text-sm text-gray-600">${p.price}</p>
                </div>
                <button aria-label="Add to wishlist" className="text-gray-400 hover:text-accent-dark shrink-0 mt-0.5">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}