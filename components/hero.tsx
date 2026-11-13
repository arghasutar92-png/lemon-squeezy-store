import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-28">
      <div>
        <p className="eyebrow mb-7 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-600" /> Digital goods for curious people</p>
        <h1 className="display-heading max-w-3xl text-6xl sm:text-7xl lg:text-[6.5rem]">{siteConfig.tagline.split(" worth ")[0]} worth <span className="italic">{siteConfig.tagline.split(" worth ")[1]}</span></h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/65">E-books, tools, and tiny sparks of inspiration for building a life and body of work you love.</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-medium text-cream transition-transform hover:-translate-y-0.5">Explore the shop <ArrowUpRight size={17} /></a>
          <a href="#about" className="arrow-link">Our story <ArrowDownRight size={17} /></a>
        </div>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
        <div className="absolute inset-0 rotate-3 rounded-[2.5rem] bg-lemon" />
        <div className="absolute inset-0 flex -rotate-6 flex-col justify-between rounded-[2.5rem] bg-[#dbe7dc] p-8 sm:p-12">
          <div className="flex items-start justify-between"><span className="font-display text-2xl font-semibold tracking-[-0.08em]">l/s</span><span className="eyebrow">Vol. 01</span></div>
          <div><p className="display-heading text-5xl sm:text-7xl">Make<br /><span className="italic">room.</span></p><div className="mt-8 h-px w-full bg-ink/20" /><p className="mt-4 text-sm text-ink/60">A field guide to creative momentum</p></div>
          <div className="flex items-end justify-between"><span className="text-5xl">✳</span><span className="text-right text-xs uppercase tracking-widest text-ink/60">{siteConfig.name.split(" ")[0]}<br />{siteConfig.name.split(" ")[1]}</span></div>
        </div>
      </div>
    </section>
  );
}
