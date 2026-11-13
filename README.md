# Lemon Squeeze

Lemon Squeeze is a commercial-ready Next.js e-commerce template for selling digital products, e-books, templates, and bundles. It combines a minimalist storefront with product discovery, a responsive cart, Stripe Checkout, and a demo delivery experience that can be replaced with a production fulfillment service.

## Project overview

### Tech stack

- **Next.js 14** with the App Router
- **TypeScript** for type-safe application code
- **Tailwind CSS** for responsive styling
- **Stripe Checkout** for secure hosted payments
- **React** client state for cart, search, filters, and modals
- **Lucide React** for interface icons
- **Vercel**-ready deployment configuration

### Included features

- Responsive storefront for mobile, tablet, and desktop
- Product cards with quick-view modal
- Sliding cart drawer with quantity controls and subtotal
- Real-time search and category filtering
- Stripe Checkout session creation through `/api/checkout`
- Server-side product and price validation before checkout
- Success page with order details and demo download
- FAQ accordion with smooth animation
- Creator and testimonial trust section
- Centralized branding in `config/site.ts`
- SEO metadata and optimized static rendering

## Requirements

- Node.js 18.17 or newer
- npm 9 or newer
- A Stripe account for live payments

## Getting started

### Clone the project

Replace the placeholder repository URL with the repository you received:

```bash
git clone https://github.com/your-account/lemon-squeeze.git
cd lemon-squeeze
```

### Install dependencies

```bash
npm install
```

### Create local environment variables

```bash
cp .env.example .env.local
```

Add your local Stripe values:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe setup

### Find your Stripe keys

1. Sign in to the [Stripe Dashboard](https://dashboard.stripe.com/).
2. Open **Developers → API keys**.
3. Copy the **Secret key** into `STRIPE_SECRET_KEY`.
4. Copy the **Publishable key** into `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
5. Use `sk_test_` and `pk_test_` keys while developing.
6. Replace them with live keys only when the store is ready to accept real payments.

Never expose `STRIPE_SECRET_KEY` in client-side code or commit it to source control. The `NEXT_PUBLIC_` prefix is intentional for the publishable key only.

### How checkout works

The cart sends the current product IDs and quantities to [`app/api/checkout/route.ts`](./app/api/checkout/route.ts):

```text
POST /api/checkout
Content-Type: application/json

{
  "items": [
    { "id": "creative-reset", "quantity": 1 }
  ]
}
```

The API route:

1. Validates the request body and quantity limits.
2. Looks up products in `lib/products.ts`.
3. Uses server-side prices rather than trusting browser-supplied prices.
4. Creates a Stripe Checkout Session.
5. Returns the hosted Checkout URL.

The customer returns to `/success?session_id=...` after payment or back to the storefront if checkout is cancelled.

## Environment variables

All variables are listed in [`.env.example`](./.env.example).

| Variable | Required | Description |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | Yes for checkout | Private Stripe server key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes for Stripe client integrations | Public Stripe key |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Base URL used for checkout redirects |
| `NEXT_PUBLIC_CREATOR_EMAIL` | Recommended | Contact email shown in the storefront |
| `NEXT_PUBLIC_CURRENCY_CODE` | Recommended | Currency code such as `USD` |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Recommended | Display symbol such as `$` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | Instagram profile URL |
| `NEXT_PUBLIC_TWITTER_URL` | Optional | X/Twitter profile URL |
| `LEMON_SQUEEZY_WEBHOOK_SECRET` | Optional | Only needed if retaining the Lemon Squeezy webhook route |

Use `.env.local` for local secrets and add the same variables to Vercel Environment Variables for Preview and Production. Do not commit `.env.local`.

## Buyer customization guide

### Update store branding and content

Edit [`config/site.ts`](./config/site.ts) to change:

- Store name, tagline, and description
- Creator name, role, and email
- Currency settings
- Social links
- FAQ questions and answers
- Testimonial content
- Demo download path

### Customize the product catalog

Edit [`lib/products.ts`](./lib/products.ts). Each product includes:

```ts
{
  id: "creative-reset",
  title: "The Creative Reset",
  description: "A short product description.",
  price: 18,
  category: "E-book",
  format: "PDF · EPUB",
  accent: "bg-[#dce7ff]",
  art: "✦"
}
```

Important:

- Keep each `id` unique; the checkout API uses it to find the trusted server-side product.
- Use numeric prices in the major currency unit, such as `18` for `$18.00`.
- Use one of the supported categories or update the filter labels in `components/product-grid.tsx`.
- Replace the demo asset in `public/downloads/` with your own product delivery solution.

### Connect your own Stripe account

Each buyer should connect their own Stripe account rather than using the template author’s keys:

1. Create or open your Stripe account.
2. Copy your test API keys into `.env.local`.
3. Run a test checkout using Stripe test cards, such as `4242 4242 4242 4242`.
4. Verify the success and cancel redirects.
5. Add live API keys to the production deployment only after testing.
6. Confirm your Stripe business, payout, tax, and payment settings.

The template creates line items dynamically from `lib/products.ts`; Stripe does not require pre-created Price IDs for the included flow. If you prefer Stripe Products and Price IDs, update the checkout route to use catalog price IDs instead.

### Replace demo fulfillment

The success page currently exposes a sample file at `public/downloads/lemon-squeeze-starter-guide.txt`. For paid products, do not place protected files in a public folder. Instead, use Stripe webhooks plus a database or private storage provider to:

- Confirm payment status
- Associate the order with the purchased product
- Create an expiring or authenticated download URL
- Email the customer a secure delivery link

## Project structure

```text
app/
├── api/checkout/route.ts               # Stripe Checkout session API
├── api/webhooks/lemonsqueezy/route.ts  # Optional signed Lemon Squeezy webhook
├── success/page.tsx                    # Confirmation and demo delivery page
├── globals.css                         # Global styles and Tailwind layers
├── layout.tsx                          # Root layout and metadata
└── page.tsx                            # Storefront page

components/
├── cart-context.tsx                    # Cart state provider
├── cart-drawer.tsx                     # Stripe checkout trigger
├── faq.tsx                             # FAQ accordion
├── footer.tsx                          # Site footer
├── hero.tsx                            # Hero section
├── navbar.tsx                          # Navigation and cart trigger
├── product-card.tsx                    # Product card and quick view trigger
├── product-grid.tsx                    # Search and category filters
├── quick-view-modal.tsx                # Product quick-view modal
└── trust-section.tsx                   # Creator and testimonial section

config/site.ts                          # Store-wide configuration
lib/products.ts                         # Server-trusted product catalog
public/downloads/                       # Demo downloadable assets
```

## Deploy to Vercel

### 1. Push the project to GitHub

Create a repository, commit the project, and push it to GitHub. Then import it from [vercel.com/new](https://vercel.com/new).

### 2. Use the default Next.js settings

Vercel detects the project automatically:

- Framework preset: **Next.js**
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave blank

### 3. Add production environment variables

In **Vercel → Project Settings → Environment Variables**, add:

```env
STRIPE_SECRET_KEY=sk_live_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Add branding and optional variables from `.env.example` as needed. Apply secrets to the correct Preview and Production environments.

### 4. Deploy and test

After deployment:

1. Open the production URL.
2. Add a product to the cart.
3. Complete a test deployment with test keys before switching to live keys.
4. Confirm Stripe redirects to `/success`.
5. Verify the browser never receives the secret key.

Configure your custom domain in Vercel before setting `NEXT_PUBLIC_SITE_URL` to the final URL.

## Quality checks

Run these commands before publishing:

```bash
npm run lint
npm run build
```

To preview the production build locally:

```bash
npm run start
```

## License

Replace this section with the commercial license terms included with your marketplace listing.
