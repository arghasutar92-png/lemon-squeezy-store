import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div><a href="#" className="font-display text-xl font-semibold tracking-[-0.06em]">{siteConfig.name.split(" ")[0]}<span className="text-emerald-700">.</span>{siteConfig.name.split(" ")[1]}</a><p className="mt-3 text-sm text-ink/50">For your next good idea.</p></div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm"><a className="arrow-link" href={`mailto:${siteConfig.creator.email}`}>Say hello <ArrowUpRight size={15} /></a><a href="#shop" className="text-ink/60 hover:text-ink">Shop</a><a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="text-ink/60 hover:text-ink">Instagram</a></div>
        <p className="text-xs text-ink/40">© {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}
