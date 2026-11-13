"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/config/site";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem } = useCart();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4 sm:p-6">
      <button aria-label="Close quick view" className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-labelledby="quick-view-title" className="relative grid w-full max-w-2xl overflow-hidden rounded-[2rem] bg-cream shadow-2xl sm:grid-cols-2">
        <div className={`flex min-h-72 items-center justify-center ${product.accent} p-10 sm:min-h-[28rem]`}>
          <span className="font-display text-[9rem] opacity-20">{product.art}</span>
        </div>
        <div className="p-7 sm:p-10">
          <button aria-label="Close quick view" onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 hover:bg-ink/10"><X size={19} /></button>
          <p className="eyebrow text-ink/50">{product.category}</p>
          <h2 id="quick-view-title" className="display-heading mt-4 text-4xl">{product.title}</h2>
          <p className="mt-5 leading-relaxed text-ink/65">{product.description}</p>
          <p className="mt-5 text-sm text-ink/45">{product.format} · Instant download</p>
          <div className="mt-9 flex items-center justify-between gap-4">
            <span className="font-display text-2xl">{formatPrice(product.price)}</span>
            <button onClick={() => { addItem(product); onClose(); }} className="flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5">Add to bag <ArrowUpRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
