export const siteConfig = {
  name: "lemon squeeze",
  tagline: "Ideas worth keeping.",
  description: "Thoughtful digital products for curious people.",
  creator: {
    name: "Your Name",
    role: "Writer, maker, and curious human",
    email: process.env.NEXT_PUBLIC_CREATOR_EMAIL ?? "hello@example.com",
  },
  testimonial: {
    quote: "The kind of resources that make a busy week feel a little more possible.",
    name: "Maya Chen",
    role: "Independent designer",
  },
  faq: [
    {
      question: "How do I receive my purchase?",
      answer: "Everything is digital. Once your payment is complete, you will see an instant download link and receive a copy by email.",
    },
    {
      question: "Can I use these for client work?",
      answer: "Yes, for your own projects and client work. Please do not redistribute, resell, or share the original files.",
    },
    {
      question: "What if I have a question about a product?",
      answer: "Send a note to the creator email and you will hear back within two business days.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Because these are digital products, purchases are generally final. If something is not right, get in touch and we will do our best to help.",
    },
  ],
  currency: {
    code: process.env.NEXT_PUBLIC_CURRENCY_CODE ?? "USD",
    symbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL ?? "$",
  },
  social: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
      "https://instagram.com/your-handle",
    twitter:
      process.env.NEXT_PUBLIC_TWITTER_URL ??
      "https://x.com/your-handle",
  },
  lemonSqueezy: {
    storeUrl:
      process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_URL ??
      "https://your-store.lemonsqueezy.com",
    checkoutUrl:
      process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL ??
      "https://your-store.lemonsqueezy.com/checkout/buy/your-checkout-id",
    products: {
      creativeReset:
        "https://your-store.lemonsqueezy.com/checkout/buy/creative-reset-id",
      slowBrand:
        "https://your-store.lemonsqueezy.com/checkout/buy/slow-brand-id",
      fieldNotes:
        "https://your-store.lemonsqueezy.com/checkout/buy/field-notes-id",
    },
  },
  downloads: {
    demo: "/downloads/lemon-squeeze-starter-guide.txt",
  },
} as const;

export function formatPrice(amount: number) {
  return `${siteConfig.currency.symbol}${amount.toFixed(2)}`;
}

export function isDemoCheckout() {
  return (
    siteConfig.lemonSqueezy.checkoutUrl.includes("your-store") ||
    siteConfig.lemonSqueezy.checkoutUrl.includes("your-checkout-id")
  );
}
