import { ArrowUpRight, Quote } from "lucide-react";
import { siteConfig } from "@/config/site";

export function TrustSection() {
  return (
    <section id="about" className="border-y border-ink/10 bg-white/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10 lg:py-24">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-lemon font-display text-2xl">
            {siteConfig.creator.name.charAt(0)}
          </div>
          <div>
            <p className="eyebrow text-ink/50">Made by</p>
            <h2 className="mt-2 font-display text-2xl">{siteConfig.creator.name}</h2>
            <p className="mt-1 text-sm text-ink/55">{siteConfig.creator.role}</p>
            <a href={`mailto:${siteConfig.creator.email}`} className="arrow-link mt-5">
              Say hello <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="relative border-l border-ink/10 pl-7 sm:pl-10">
          <Quote className="absolute -left-3 -top-3 bg-cream text-emerald-700" size={25} />
          <blockquote className="font-display text-3xl leading-tight sm:text-4xl">
            &ldquo;{siteConfig.testimonial.quote}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm text-ink/55">
            {siteConfig.testimonial.name} · {siteConfig.testimonial.role}
          </p>
        </div>
      </div>
    </section>
  );
}
