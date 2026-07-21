import { Sparkles, Ruler, TrendingUp, Headset } from "lucide-react";
import { Container } from "@/components/ui/Container";

const REASONS = [
  { icon: Sparkles, title: "Premium Quality", subtitle: "Handpicked materials" },
  { icon: Ruler, title: "Perfect Fit", subtitle: "Designed for comfort" },
  { icon: TrendingUp, title: "Trendy Styles", subtitle: "Stay ahead of fashion" },
  { icon: Headset, title: "Customer Support", subtitle: "We're here to help" },
];

export function WhyShopWithUs() {
  return (
    <section className="py-12">
      <Container>
        <h2 className="text-2xl font-semibold text-ink mb-6">Why Shop With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-accent-dark">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}