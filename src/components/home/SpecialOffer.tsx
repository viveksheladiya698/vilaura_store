"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

export function SpecialOffer({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(targetDate)); // first real calculation happens client-side, after mount
    const interval = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units: [string, number][] = [
    ["Days", time?.days ?? 0],
    ["Hours", time?.hours ?? 0],
    ["Mins", time?.mins ?? 0],
    ["Secs", time?.secs ?? 0],
  ];

  return (
    <section className="py-6">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-cream grid grid-cols-1 lg:grid-cols-2 items-center gap-8 p-8 lg:p-12">
          <div>
            <span className="text-xs font-semibold tracking-widest text-accent-dark uppercase">
              Special Offer
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl leading-tight text-ink">
              Get 20% Off Your First Order
            </h2>
            <p className="mt-3 text-gray-600 max-w-sm">
              Join our community and be the first to know about new arrivals, exclusive offers and style tips.
            </p>

            <div className="mt-6 flex gap-3">
              {units.map(([label, value]) => (
                <div key={label} className="flex flex-col items-center justify-center h-16 w-16 rounded-md bg-white shadow-sm">
                  <span className="text-lg font-semibold text-ink">
                    {time ? String(value).padStart(2, "0") : "00"}
                  </span>
                  <span className="text-[10px] text-gray-500">{label}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" className="mt-6">Shop Now</Button>
          </div>

          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden">
            <Image
              src="/images/banners/special-offer.jpg"
              alt="Special offer"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}