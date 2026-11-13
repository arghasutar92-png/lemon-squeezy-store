"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
      <div className="mb-12 text-center">
        <p className="eyebrow mb-4">Good to know</p>
        <h2 className="display-heading text-4xl sm:text-5xl">Questions, answered.</h2>
      </div>
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {siteConfig.faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-medium sm:text-lg"
              >
                {item.question}
                <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={19} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 pr-8 text-sm leading-relaxed text-ink/60">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
