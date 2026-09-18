# apollos.gg

NBA 2K specialist store. One Cronus Zen script (Swish), one game, plus a blog.

Next.js 16 (App Router) · React 19 · Tailwind 4 · Whop embedded checkout · Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, also checks types
npm run lint
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/config/site.ts` | **The brand.** Name, domain, tagline, Discord, pixels, Whop scope, nav and footer links, promo bar. |
| `src/data/product.ts` | **The catalogue and all copy.** Product(s), prices, Whop plan id, features with their clips, what's-included lists, setup steps, reviews, FAQ. |
| `src/data/legal.ts` | Terms, privacy and refund text. Brand name is interpolated from the config. |
| `content/blog/*.md` | **Blog posts.** Markdown with frontmatter. File name is the URL slug. |
| `src/lib/blog.ts` | Reads and renders the posts. |
| `src/app/globals.css` | Theme tokens (`--ink`, `--green`, fonts, shadows, keyframes) and the `.prose-blog` article styles. |
| `src/app/page.tsx` | Home. A list of sections, top to bottom. |
| `src/app/swish/page.tsx` | Product page, with Product structured data. |
| `src/app/blog/` | Blog index and post pages, with Article structured data. |
| `src/app/guides/page.tsx` | Setup guide. |
| `src/app/legal/[section]/page.tsx` | Legal pages, statically generated from `legal.ts`. |
| `src/app/success/page.tsx` | Post-checkout page Whop returns to. |
| `src/app/about/page.tsx` | About page. The trust page search engines and AI assistants look for. |
| `src/app/opengraph-image.tsx`, `icon.svg`, `sitemap.ts`, `robots.ts`, `manifest.ts` | Share card, favicon, sitemap, robots and web manifest, all generated. |
| `src/app/llms.txt/`, `src/app/llms-full.txt/` | Plain-text site summary and full content for AI assistants, generated from the data files. |
| `src/app/feed.xml/` | RSS feed of the blog. |
| `src/lib/seo.tsx` | JSON-LD builders (Organization, WebSite, Product, FAQPage, Article, BreadcrumbList) and the `<JsonLd>` component. |
| `src/lib/llms.ts` | Builds the two llms.txt files from the product, FAQ, steps and posts. |
| `next.config.ts` | Security headers and long cache lifetimes for the video folders. |
| `src/components/sections/*` | One file per page section: Hero, Marquee, FeatureShowcase, Included, HowItWorks, Pricing, Reviews, Faq, FinalCta. |
| `src/components/layout/*` | PromoBar, Header, Footer, StickyCta, Pixels. |
| `src/components/checkout/*` | `CheckoutProvider` (mounted once in the layout), `CheckoutModal` (Whop embed) and `BuyButton`. |
| `src/components/ui/*` | Primitives: Button, Container/Section/SectionHeading, Badge, Reveal (scroll fade-in). |
| `public/videos/*` | Feature clips referenced from `product.ts`. |

## Adding things

**A blog post.** Create `content/blog/my-post.md`:

```md
---
title: "Post title"
description: "One or two sentences. Used as the meta description and the card text."
date: "2026-09-18"
tags: ["nba-2k27", "settings"]
---

Markdown body. Headings, lists, tables, images in /public all work.
```

It appears at `/blog/my-post` and in the sitemap on the next build.

**A new section on a page.** Create `src/components/sections/MySection.tsx`, export a component, and add `<MySection />` where you want it in `src/app/page.tsx`. Wrap content in `<Section id="...">` and `<Container>` from `ui/Container` to get the same spacing as the rest of the page. Wrap blocks in `<Reveal>` for the scroll-in animation.

**A buy button anywhere.** `import { BuyButton } from '@/components/checkout/BuyButton'` and render `<BuyButton product={SWISH} />`. It opens the Whop checkout modal. For a custom trigger, call `useCheckout().open(product)` from any client component.

**A new page.** Add a folder under `src/app/` with a `page.tsx`, export `metadata`, and add it to `sitemap.ts` and the nav in `site.ts`.

**A second product.** Add another object to `PRODUCTS` in `product.ts` with its own `path`, then create `src/app/<path>/page.tsx` by copying `swish/page.tsx` and swapping the import.

**Porting a React + Tailwind component from another project.** Add `'use client'` at the top if it uses hooks or browser APIs, swap any router `Link`/`useNavigate` for `next/link` and `next/navigation`, and replace hardcoded colours with the tokens in `globals.css` (`bg-ink-2`, `text-fg-2`, `text-green`, `border-line`).

## Before launch

Everything below is intentionally empty so this site shares no account, id or asset with any other store.

1. **Whop.** Create a Whop company for this brand, add the product and plan, and paste the plan id into `product.ts` (`whopPlanId`) and the pixel scope into `site.ts`. Until then, buy buttons show a "checkout is being set up" panel.
2. **Discord.** Create a server for this brand and set `discordInvite` in `site.ts`. Every Discord button is hidden while it is empty.
3. **Reviews.** The six reviews in `product.ts` are placeholders. Replace them with real customer reviews for this brand.
4. **Videos.** The clips in `public/videos` are stand-ins. Record this brand's own clips with its own overlay before launch.
5. **Pixels.** Set `pixels.googleAds`, `pixels.tiktok` and `whop.pixelScope` in `site.ts` from properties created for this brand.
6. **Domain.** Set `url` and `domain` in `site.ts`, add the domain in Vercel, and submit `https://<domain>/sitemap.xml` in a Search Console property for this domain.
