"use client";

import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { QuickViewModal } from "@/components/quick-view-modal";
import { formatPrice } from "@/config/site";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const { addItem } = useCart();

  return (
    <>
      <article className="group">
      <div className={`relative aspect-[1.12] overflow-hidden rounded-3xl ${product.accent} p-7 transition-transform duration-300 group-hover:-translate-y-1 sm:p-9`}>
        {product.featured && <span className="absolute left-5 top-5 rounded-full bg-ink px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cream">Best seller</span>}
        <span className="absolute right-8 top-5 font-display text-5xl opacity-20">{product.art}</span>
        <div className="absolute bottom-7 left-7 right-7 sm:bottom-9 sm:left-9 sm:right-9">
          <p className="eyebrow text-ink/55">{product.category}</p>
          <h3 className="display-heading mt-2 max-w-xs text-3xl">{product.title}</h3>
        </div>
        <button aria-label={`Quick view ${product.title}`} onClick={() => setShowQuickView(true)} className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink opacity-0 transition-opacity group-hover:opacity-100"><ArrowUpRight size={18} /></button>
      </div>
      <div className="flex items-start justify-between gap-4 px-1 pt-5">
        <div><button className="text-left text-sm leading-relaxed text-ink/60 hover:text-ink" onClick={() => setShowQuickView(true)}>{product.description}</button><p className="mt-2 text-xs text-ink/40">{product.format}</p></div>
        <div className="flex shrink-0 flex-col items-end gap-3"><span className="font-display text-lg font-medium">{formatPrice(product.price)}</span><button aria-label={`Add ${product.title} to bag`} onClick={() => addItem(product)} className="flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-ink hover:text-cream"><ShoppingBag size={13} /> Add</button></div>
      </div>
      </article>
      {showQuickView && <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />}
    </>
  );
}
