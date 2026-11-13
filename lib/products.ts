export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  format: string;
  accent: string;
  art: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "creative-reset",
    title: "The Creative Reset",
    description: "A 30-day guide to making space for your best work.",
    price: 18,
    category: "E-book",
    format: "PDF · EPUB",
    accent: "bg-[#dce7ff]",
    art: "✦",
    featured: true,
  },
  {
    id: "slow-brand",
    title: "Slow Brand, Strong Brand",
    description: "Build a brand people remember without rushing the process.",
    price: 24,
    category: "E-book",
    format: "PDF · 86 pages",
    accent: "bg-[#f3d9c8]",
    art: "◒",
  },
  {
    id: "field-notes",
    title: "Field Notes for Focus",
    description: "A printable planning system for clear-headed weeks.",
    price: 12,
    category: "Template",
    format: "Notion · PDF",
    accent: "bg-[#d9ead5]",
    art: "✎",
  },
  {
    id: "full-squeeze",
    title: "The Full Squeeze",
    description: "All three guides, together, for your most considered season yet.",
    price: 42,
    category: "Bundle",
    format: "PDF · EPUB · Notion",
    accent: "bg-[#f0e2b8]",
    art: "✺",
    featured: true,
  },
];
