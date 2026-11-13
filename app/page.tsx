import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { FAQ } from "@/components/faq";
import { TrustSection } from "@/components/trust-section";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/products";
import { CartProvider } from "@/components/cart-context";

export default function Home() {
  return (
    <CartProvider>
      <main>
      <Navbar />
      <Hero />

      <section id="shop" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">The good stuff</p>
            <h2 className="display-heading max-w-xl text-4xl sm:text-5xl">
              Made to move you forward.
            </h2>
          </div>
          <a className="arrow-link" href="#newsletter">
            Get the monthly squeeze <ArrowDownRight size={18} />
          </a>
        </div>
        <ProductGrid products={products} />
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:px-10 lg:py-32">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-lemon text-ink">
              <Sparkles size={21} />
            </div>
            <p className="eyebrow text-lemon">Why lemon squeeze?</p>
            <h2 className="display-heading mt-4 max-w-md text-4xl sm:text-5xl">
              Small ideas can make a big difference.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              ["01", "Thoughtfully made", "No filler, no fluff. Just useful ideas, beautifully packaged."],
              ["02", "Instantly yours", "Download your new favorite resource and start today."],
              ["03", "Always evolving", "Every product is designed to grow with your practice."],
              ["04", "A little brighter", "A gentle nudge toward work and life that feels like yours."],
            ].map(([number, title, copy]) => (
              <div key={number} className="border-t border-cream/20 pt-5">
                <span className="text-sm text-lemon">{number}</span>
                <h3 className="mt-7 text-xl font-medium">{title}</h3>
                <p className="mt-3 leading-relaxed text-cream/60">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="rounded-[2rem] bg-lemon px-6 py-14 text-center sm:px-12">
          <p className="eyebrow">The squeeze</p>
          <h2 className="display-heading mx-auto mt-4 max-w-2xl text-4xl sm:text-6xl">
            Good ideas, in your inbox.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ink/70">
            A bright little note with new releases, useful links, and a reason to pause.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input aria-label="Email address" type="email" placeholder="Your email address" className="min-w-0 flex-1 rounded-full border border-ink/10 bg-white/70 px-5 py-3.5 outline-none placeholder:text-ink/45 focus:border-ink" />
            <button type="submit" className="rounded-full bg-ink px-6 py-3.5 font-medium text-cream transition-transform hover:-translate-y-0.5">Subscribe</button>
          </form>
        </div>
      </section>

      <FAQ />
      <TrustSection />
      <Footer />
      </main>
    </CartProvider>
  );
}
