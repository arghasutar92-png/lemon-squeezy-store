"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount, setCartOpen } = useCart();

  return (
    <header className="relative z-20 border-b border-ink/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#" className="font-display text-xl font-semibold tracking-[-0.06em]">{siteConfig.name.split(" ")[0]}<span className="text-emerald-700">.</span>{siteConfig.name.split(" ")[1]}</a>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#shop" className="transition-opacity hover:opacity-60">Shop</a>
          <a href="#about" className="transition-opacity hover:opacity-60">Our story</a>
          <a href="#newsletter" className="transition-opacity hover:opacity-60">Newsletter</a>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label={`Open shopping cart${itemCount ? `, ${itemCount} items` : ""}`} onClick={() => setCartOpen(true)} className="relative rounded-full border border-ink/15 p-2.5 transition-colors hover:bg-ink hover:text-cream"><ShoppingBag size={18} />{itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-lemon px-1 text-[10px] font-bold text-ink">{itemCount}</span>}</button>
          <a href="#shop" className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5 md:block">Browse all</a>
        </div>
        <button aria-label={open ? "Close menu" : "Open menu"} className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-ink/10 bg-cream px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5 text-lg">
            <a href="#shop" onClick={() => setOpen(false)}>Shop</a>
            <a href="#about" onClick={() => setOpen(false)}>Our story</a>
            <a href="#newsletter" onClick={() => setOpen(false)}>Newsletter</a>
          </div>
        </div>
      )}
    </header>
  );
}
