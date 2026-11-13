"use client";

import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/config/site";

export function CartDrawer() {
  const { items, isOpen, removeItem, setCartOpen, updateQuantity } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (isCheckingOut || items.length === 0) return;

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "We couldn't start checkout. Please try again.");
      }

      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "We couldn't start checkout. Please try again.",
      );
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 bg-ink/35 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={19} />
            <h2 className="font-display text-xl">Your bag</h2>
            <span className="text-sm text-ink/45">({items.length})</span>
          </div>
          <button
            aria-label="Close shopping cart"
            className="rounded-full p-2 transition-colors hover:bg-ink/10"
            onClick={() => setCartOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="mb-5 text-5xl">✳</span>
              <h3 className="font-display text-2xl">Your bag is bright and empty.</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/55">
                Add something useful and it will show up right here.
              </p>
              <button
                className="mt-7 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream"
                onClick={() => setCartOpen(false)}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl ${item.accent}`}>
                    <span className="font-display text-4xl opacity-30">{item.art}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-medium leading-tight">{item.title}</h3>
                      <span className="font-display">{formatPrice(item.price)}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink/45">{item.format}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-ink/10 px-2 py-1 text-sm">
                        <button aria-label={`Decrease ${item.title} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button aria-label={`Increase ${item.title} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={13} />
                        </button>
                      </div>
                      <button className="text-xs text-ink/45 underline underline-offset-2 hover:text-ink" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-6">
            <div className="flex items-center justify-between text-lg">
              <span>Subtotal</span>
              <span className="font-display">{formatPrice(total)}</span>
            </div>
            <p className="mt-2 text-xs text-ink/45">Instant digital delivery. Taxes calculated at checkout.</p>
            {checkoutError && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {checkoutError}
              </p>
            )}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 font-medium text-cream transition-all hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
            >
              {isCheckingOut ? "Opening secure checkout..." : "Checkout"}
              {!isCheckingOut && <ArrowRight size={17} />}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
