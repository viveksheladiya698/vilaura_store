import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../icons/SocialIcons";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Men Pants", "Women Pants", "Jeans", "Joggers", "Shorts", "Chinos"],
  },
  {
    title: "Customer Care",
    links: ["Size Guide", "Shipping Info", "Returns & Exchanges", "FAQs", "Track Order", "Contact Us"],
  },
  {
    title: "About",
    links: ["About Us", "Our Story", "Sustainability", "Careers", "Privacy Policy", "Terms & Conditions"],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white pt-14 pb-6">
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
        <div className="lg:col-span-1">
          <span className="font-display text-xl tracking-wide">VILAURA</span>
          <span className="block text-[10px] tracking-[0.3em] text-gray-400 mb-4">CLOTHING</span>
          <p className="text-sm text-gray-400 mb-4">
            Premium quality pants for men and women. Style that moves with you.
          </p>
          <div className="flex gap-3">
            {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
              <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Icon fontSize={15} />
              </span>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold mb-4">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-1">
          <h3 className="text-sm font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-white"
            />
            <Button variant="primary" size="sm" type="submit">Subscribe</Button>
          </form>
        </div>
      </Container>

      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-gray-400">
        <p>© 2024 Vilaura Clothing. All rights reserved.</p>
        <div className="flex gap-3 opacity-70">
          <span>VISA</span><span>Mastercard</span><span>PayPal</span><span>Apple Pay</span><span>GPay</span>
        </div>
      </Container>
    </footer>
  );
}