"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

const categories = ["All", "E-books", "Templates", "Bundles"] as const;

export function ProductGrid({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category.toLowerCase().startsWith(activeCategory.slice(0, -1).toLowerCase());
      const matchesSearch =
        !query ||
        [product.title, product.description, product.category].some((value) =>
          value.toLowerCase().includes(query),
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, search]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
          <input
            aria-label="Search products"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search the shop..."
            className="w-full rounded-full border border-ink/15 bg-white/50 py-3.5 pl-11 pr-5 text-sm outline-none transition-colors placeholder:text-ink/40 focus:border-ink"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="mr-2 shrink-0 text-ink/40" size={17} />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                activeCategory === category
                  ? "bg-ink text-cream"
                  : "border border-ink/10 bg-white/40 text-ink/60 hover:border-ink/30 hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-ink/20 px-6 py-16 text-center">
          <p className="font-display text-2xl">Nothing found yet.</p>
          <p className="mt-2 text-sm text-ink/55">Try another search or browse every idea.</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("All"); }}
            className="mt-5 text-sm font-medium underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
