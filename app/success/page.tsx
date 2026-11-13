import { Check, Download, KeyRound, Sparkles } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

type SuccessPageProps = {
  searchParams: {
    order?: string;
    email?: string;
    product?: string;
    license?: string;
  };
};

function createDemoLicense(orderId: string) {
  const normalized = orderId.replace(/[^a-z0-9]/gi, "").toUpperCase().padEnd(8, "0");
  return `LEMON-${normalized.slice(0, 4)}-${normalized.slice(4, 8)}-DEMO`;
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const orderId = searchParams.order ?? "demo-order-001";
  const product = searchParams.product ?? "The Creative Reset";
  const email = searchParams.email ?? "demo@example.com";
  const licenseKey = searchParams.license ?? createDemoLicense(orderId);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <Link href="/" className="font-display text-xl font-semibold tracking-[-0.06em]">
          {siteConfig.name.split(" ")[0]}<span className="text-emerald-700">.</span>{siteConfig.name.split(" ")[1]}
        </Link>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-soft">
          <div className="bg-lemon px-7 py-12 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-lemon">
              <Check size={26} strokeWidth={2.5} />
            </div>
            <p className="eyebrow mt-6">Order confirmed</p>
            <h1 className="display-heading mt-3 text-5xl sm:text-6xl">You&apos;re all set.</h1>
            <p className="mx-auto mt-5 max-w-md text-ink/65">
              Your digital product is ready. We&apos;ve also sent a copy to {email}.
            </p>
          </div>

          <div className="space-y-8 px-7 py-8 sm:px-12 sm:py-10">
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 shrink-0 text-emerald-700" size={20} />
              <div>
                <p className="text-xs uppercase tracking-wider text-ink/45">Your product</p>
                <h2 className="mt-1 text-lg font-medium">{product}</h2>
                <p className="mt-1 text-sm text-ink/50">Order {orderId}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-sage/60 p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <KeyRound size={16} />
                Demo license key
              </div>
              <code className="mt-4 block break-all rounded-xl bg-white/70 px-4 py-3 font-mono text-sm tracking-wider text-ink/75">
                {licenseKey}
              </code>
            </div>

            <a
              href={siteConfig.downloads.demo}
              download
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 font-medium text-cream transition-transform hover:-translate-y-0.5"
            >
              <Download size={18} />
              Download your product
            </a>
            <p className="text-center text-xs leading-relaxed text-ink/45">
              This is a demo delivery flow. Connect the webhook to your database and replace
              the sample download with your protected product delivery in production.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
