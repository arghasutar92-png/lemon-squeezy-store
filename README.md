# lemon squeeze

A polished Next.js storefront template for selling digital products, e-books, templates, and bundles with Lemon Squeezy.

Built with the Next.js App Router, TypeScript, Tailwind CSS, and lightweight client-side state. The template includes a responsive storefront, product discovery tools, cart drawer, quick views, demo delivery flow, and Lemon Squeezy webhook boilerplate.

## Features

- Responsive, minimalist storefront UI for mobile, tablet, and desktop
- Product cards with quick-view modal and add-to-cart actions
- Sliding shopping cart drawer with quantity controls and subtotal
- Real-time product search and category filtering
- FAQ accordion with smooth transitions
- Creator and testimonial trust section
- Centralized store configuration in `config/site.ts`
- Environment variable support through `.env.example`
- Lemon Squeezy checkout URL integration
- Signed Lemon Squeezy webhook endpoint
- Demo checkout and digital delivery flow
- Downloadable success page with simulated license key
- SEO metadata and optimized static rendering
- Smooth scrolling and Tailwind utility styling

## Requirements

- Node.js 18.17 or newer
- npm 9 or newer
- A Lemon Squeezy account for live payments and webhooks

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the template

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update the values in `.env.local` with your own store details. Then customize the content in [`config/site.ts`](./config/site.ts), including:

- Store name, tagline, and description
- Creator name, role, and email
- Currency code and symbol
- Social profile links
- Lemon Squeezy store and checkout URLs
- FAQ content
- Creator testimonial
- Demo download path

Product names, descriptions, categories, prices, and visual accents are managed in [`lib/products.ts`](./lib/products.ts).

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Lemon Squeezy setup

### Configure checkout

Replace the placeholder values in `config/site.ts` or `.env.local`:

```env
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_URL=https://your-store.lemonsqueezy.com
NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL=https://your-store.lemonsqueezy.com/checkout/buy/your-checkout-id
```

When the checkout URL still contains the placeholder values, the cart automatically uses the local demo flow and redirects to `/success`. Once a real checkout URL is configured, the checkout button opens Lemon Squeezy in a new tab.

For product-specific checkout links, update the `lemonSqueezy.products` values in `config/site.ts` and connect them to your product records or checkout actions.

### Configure webhooks

Add your Lemon Squeezy signing secret:

```env
LEMON_SQUEEZY_WEBHOOK_SECRET=your-webhook-signing-secret
```

Set the webhook URL in Lemon Squeezy to:

```text
https://your-domain.com/api/webhooks/lemonsqueezy
```

The endpoint at [`app/api/webhooks/lemonsqueezy/route.ts`](./app/api/webhooks/lemonsqueezy/route.ts) validates the `x-signature` HMAC header and includes handlers for:

- `order_created`
- `license_key_created`

The handlers currently log verified event details. For a production store, connect these handlers to your database, order system, and protected download service before launching.

## Environment variables

All available variables are documented in [`.env.example`](./.env.example).

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public site URL |
| `NEXT_PUBLIC_CREATOR_EMAIL` | Recommended | Contact email shown in the storefront |
| `NEXT_PUBLIC_CURRENCY_CODE` | Recommended | Currency code, such as `USD` |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Recommended | Display symbol, such as `$` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional | Instagram profile URL |
| `NEXT_PUBLIC_TWITTER_URL` | Optional | X/Twitter profile URL |
| `NEXT_PUBLIC_LEMON_SQUEEZY_STORE_URL` | Required for live payments | Lemon Squeezy store URL |
| `NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL` | Required for live payments | Default checkout URL |
| `LEMON_SQUEEZY_WEBHOOK_SECRET` | Required for webhooks | Lemon Squeezy webhook signing secret |

Never commit `.env.local` or production secrets to source control.

## Project structure

```text
app/
├── api/webhooks/lemonsqueezy/route.ts  # Signed webhook endpoint
├── success/page.tsx                     # Order confirmation and demo delivery
├── globals.css                          # Global styles and Tailwind layers
├── layout.tsx                           # Root layout and metadata
└── page.tsx                             # Storefront page

components/
├── cart-context.tsx                     # Cart state provider
├── cart-drawer.tsx                      # Sliding shopping cart
├── faq.tsx                              # FAQ accordion
├── footer.tsx                           # Site footer
├── hero.tsx                             # Store hero section
├── navbar.tsx                           # Navigation and cart trigger
├── product-card.tsx                     # Product card and quick view trigger
├── product-grid.tsx                     # Search and category filtering
├── quick-view-modal.tsx                 # Product quick-view modal
└── trust-section.tsx                    # Creator and testimonial section

config/site.ts                           # Store-wide configuration
lib/products.ts                          # Product catalog data
public/downloads/                        # Demo downloadable assets
public/                                  # Static assets
```

## Production checks

Run the lint and production build before publishing:

```bash
npm run lint
npm run build
```

To preview the production build locally:

```bash
npm run start
```

## Deploy to Vercel

### 1. Push the project to GitHub

Create a repository and push this project to it. Then import the repository into [Vercel](https://vercel.com/new).

### 2. Configure the project

Vercel detects Next.js automatically. Use the default settings:

- Framework preset: **Next.js**
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: leave blank

### 3. Add environment variables

In the Vercel project settings, add the values from `.env.local` for the appropriate environments:

- Preview
- Production

At minimum, configure the live Lemon Squeezy URLs and `LEMON_SQUEEZY_WEBHOOK_SECRET` before accepting payments.

### 4. Configure the production webhook

After the first production deployment, copy the Vercel domain into Lemon Squeezy and create the webhook:

```text
https://your-vercel-domain.com/api/webhooks/lemonsqueezy
```

Test an order and confirm that the webhook is received before launch.

### 5. Replace demo delivery

The included success page links to a sample file at `public/downloads/lemon-squeeze-starter-guide.txt`. Replace this demo asset with your protected delivery flow. Do not expose paid product files publicly when access control or license validation is required.

## Customization

The visual system is defined with Tailwind in [`tailwind.config.ts`](./tailwind.config.ts). Update the colors, fonts, and spacing there to match your brand.

For marketplace buyers, the recommended customization order is:

1. Update `config/site.ts`
2. Replace products in `lib/products.ts`
3. Add the real Lemon Squeezy checkout URLs
4. Replace the demo download and webhook persistence logic
5. Update the social links and creator content

## License

Replace this section with the commercial license terms you want to ship with your marketplace listing.
