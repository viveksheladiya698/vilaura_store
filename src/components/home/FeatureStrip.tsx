import { Truck, RefreshCcw, ShieldCheck, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders above $99" },
  { icon: RefreshCcw, title: "Easy Returns", subtitle: "30 days return policy" },
  { icon: ShieldCheck, title: "Secure Payments", subtitle: "100% secure checkout" },
  { icon: BadgeCheck, title: "Quality Assured", subtitle: "Premium quality products" },
];

export function FeatureStrip() {
  return (
    <div className="border-b border-border">
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {FEATURES.map(({ icon: Icon, title, subtitle }) => (
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
      </Container>
    </div>
  );
}