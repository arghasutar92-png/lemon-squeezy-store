import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

type LemonSqueezyEvent = {
  meta?: {
    event_name?: string;
    custom_data?: Record<string, string>;
  };
  data?: {
    id?: string;
    type?: string;
    attributes?: Record<string, unknown>;
  };
};

function isValidSignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const providedBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

export async function POST(request: Request) {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("LEMON_SQUEEZY_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook endpoint is not configured" },
      { status: 500 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  if (!isValidSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: LemonSqueezyEvent;
  try {
    event = JSON.parse(rawBody) as LemonSqueezyEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const eventName = event.meta?.event_name;
  switch (eventName) {
    case "order_created":
      // Persist the order and provision its download in your database here.
      console.info("Lemon Squeezy order created", {
        orderId: event.data?.id,
        customData: event.meta?.custom_data,
      });
      break;
    case "license_key_created":
      // Persist the license key against the order before acknowledging the event.
      console.info("Lemon Squeezy license key created", {
        licenseId: event.data?.id,
        customData: event.meta?.custom_data,
      });
      break;
    default:
      console.info("Ignoring unsupported Lemon Squeezy event", { eventName });
  }

  return NextResponse.json({ received: true });
}
