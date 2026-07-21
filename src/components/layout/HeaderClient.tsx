"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Heart, ShoppingBag, ChevronDown, User, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function HeaderClient({
  isLoggedIn,
  userName,
}: {
  isLoggedIn: boolean;
  userName: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 0; // wire to real cart count later

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="font-display text-2xl tracking-wide">VILAURA</span>
          <span className="block text-[10px] tracking-[0.3em] text-gray-500">CLOTHING</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 text-sm font-medium text-ink hover:text-accent-dark transition-colors"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown size={14} />}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <IconButton aria-label="Search">
            <Search size={19} />
          </IconButton>
          <IconButton aria-label="Wishlist">
            <Heart size={19} />
          </IconButton>
          <IconButton aria-label="Cart" badge={cartCount}>
            <ShoppingBag size={19} />
          </IconButton>

          {isLoggedIn ? (
            <Link
              href="/profile"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink hover:bg-border transition-colors"
              aria-label="My account"
            >
              <User size={18} />
            </Link>
          ) : (
            <div className="ml-2 hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">Register</Button>
              </Link>
            </div>
          )}

          <button
            className="ml-1 flex h-9 w-9 items-center justify-center lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <Container className="flex flex-col gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button variant="primary" className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </Container>
        </div>
      )}
    </header>
  );
}