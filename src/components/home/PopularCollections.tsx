import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const COLLECTIONS = [
  { title: "Weekend Vibes", subtitle: "Casual & Comfortable", image: "/images/collections/weekend-vibes.jpg", href: "/collections/weekend-vibes" },
  { title: "Office Ready", subtitle: "Sharp & Professional", image: "/images/collections/office-ready.jpg", href: "/collections/office-ready" },
  { title: "Street Style", subtitle: "Trendy & Urban", image: "/images/collections/street-style.jpg", href: "/collections/street-style" },
  { title: "Summer Essentials", subtitle: "Light & Breathable", image: "/images/collections/summer-essentials.jpg", href: "/collections/summer-essentials" },
];

export function PopularCollections() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-ink">Popular Collections</h2>
          <Link href="/collections" className="text-sm font-medium text-ink hover:text-accent-dark">
            View all collections →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTIONS.map((c) => (
            <Link key={c.title} href={c.href} className="group relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">{c.title}</p>
                <p className="text-xs text-white/80">{c.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}