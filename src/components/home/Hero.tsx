"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type Slide = {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    eyebrow: "New Collection",
    heading: "Style that moves with you.",
    description:
      "Premium quality pants for every occasion. Comfort, durability, confidence.",
    image: "/images/hero/hero-1.png",
    primaryCta: { label: "Shop Now", href: "/products" },
    secondaryCta: { label: "Explore Collections", href: "/collections" },
  },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  const goTo = (index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative bg-cream overflow-hidden">
      <Container className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-12 lg:py-0 lg:min-h-[560px]">
        {/* Text content */}
        <div className="order-2 lg:order-1 max-w-lg">
          <span className="text-xs font-semibold tracking-widest text-accent-dark uppercase">
            {slide.eyebrow}
          </span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-ink">
            {slide.heading}
          </h1>
          <p className="mt-4 text-gray-600 text-base max-w-md">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={slide.primaryCta.href}>
              <Button variant="primary">{slide.primaryCta.label}</Button>
            </Link>
            <Link href={slide.secondaryCta.href}>
              <Button variant="outline" className="bg-white">
                {slide.secondaryCta.label}
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-cream bg-gray-300"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">Trusted by 10,000+ customers</span>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-auto lg:h-[560px] w-full">
          <Image
            src={slide.image}
            alt={slide.heading}
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        {/* Arrows — only show if more than one slide */}
        {SLIDES.length > 1 && (
          <>
            <button
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:bg-cream transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm hover:bg-cream transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </Container>

      {/* Dots */}
      {SLIDES.length > 1 && (
        <div className="flex justify-center gap-2 pb-6">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-ink" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}