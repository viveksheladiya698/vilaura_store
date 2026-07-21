import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
};

export function ShopByCategory({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="py-12">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-ink">Shop by Category</h2>
          <Link href="/categories" className="text-sm font-medium text-ink hover:text-accent-dark">
            View all categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?categorySlug=${cat.slug}`} className="group">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-cream">
                <Image
                  src={cat.image ?? "/images/placeholders/product-placeholder.jpg"}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 16vw, 33vw"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-ink">{cat.name}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}