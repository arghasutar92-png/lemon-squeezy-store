import Stripe from "stripe";
import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { products } from "@/lib/products";

type CheckoutItem = {
  id: string;
  quantity: number;
};

function isCheckoutItem(value: unknown): value is CheckoutItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    item.quantity <= 10
  );
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is not configured");
    return NextResponse.json(
      { error: "Stripe checkout is not configured" },
      { status: 500 },
    );
  }

  let body: { items?: unknown };
  try {
    body = (await request.json()) as { items?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !Array.isArray(body.items) ||
    body.items.length === 0 ||
    body.items.length > 50 ||
    !body.items.every(isCheckoutItem)
  ) {
    return NextResponse.json(
      { error: "Provide between 1 and 50 valid cart items" },
      { status: 400 },
    );
  }

  const catalog = new Map(products.map((product) => [product.id, product]));
  const requestedItems = body.items.map((item) => ({
    item,
    product: catalog.get(item.id),
  }));

  if (requestedItems.some(({ product }) => !product)) {
    return NextResponse.json({ error: "Cart contains an unknown product" }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin
  ).replace(/\/$/, "");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: requestedItems.map(({ item, product }) => ({
      quantity: item.quantity,
      price_data: {
        currency: siteConfig.currency.code.toLowerCase(),
        unit_amount: Math.round(product!.price * 100),
        product_data: {
          name: product!.title,
          description: product!.description,
        },
      },
    })),
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/?checkout=cancelled`,
  });

  if (!session.url) {
    console.error("Stripe returned a checkout session without a URL", {
      sessionId: session.id,
    });
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
