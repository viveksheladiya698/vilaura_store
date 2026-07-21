import { Truck, RefreshCcw, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";

const MESSAGES = [
  { icon: Truck, text: "Free shipping on all orders above $99" },
  { icon: RefreshCcw, text: "Easy returns & exchanges" },
  { icon: Star, text: "New arrivals every week!" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white text-xs">
      <Container className="flex items-center justify-center gap-8 py-2 overflow-x-auto">
        {MESSAGES.map(({ icon: Icon, text }, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap">
            <Icon size={14} />
            {text}
          </span>
        ))}
      </Container>
    </div>
  );
}