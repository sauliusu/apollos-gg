/**
 * Everything that makes this site *this brand* lives here.
 * Copy this file to spin up another site; nothing else needs to change.
 *
 * Keep this brand's accounts separate from any other store you run: its own Discord server,
 * its own Whop company, its own pixel and analytics properties. Shared ids are how two sites
 * get tied together.
 */
export const site = {
  name: 'Apollos',
  domain: 'apollos.gg',
  url: 'https://apollos.gg',
  // What the site is about. Used in titles, OG tags and structured data.
  tagline: 'The NBA 2K Cronus Zen specialist',
  description:
    'One thing, done properly: the most complete NBA 2K27 Cronus Zen script. Auto green, button tempo, dunk meter macro, dribble combos and defense AI, updated every patch, with setup in two minutes.',
  ogTitle: 'Apollos | NBA 2K27 Cronus Zen Script',

  // Community and support. Leave the invite empty until this brand has its own server;
  // every Discord button on the site hides itself while it is empty.
  discordInvite: '',
  supportEmail: '',
  socials: {
    tiktok: '',
    youtube: '',
    twitter: '',
  },

  // Whop. Fill in from this brand's own Whop company.
  whop: {
    // Business scope for the Whop pixel ("biz_..."). Empty = pixel not loaded.
    pixelScope: '',
    storeSlug: '',
  },

  // Ad / analytics pixels. Empty string = not loaded.
  pixels: {
    googleAds: '',
    tiktok: '',
  },
  googleSiteVerification: '',

  // Optional backend for logged-in downloads. Leave empty until one exists for this brand.
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',

  // Promo bar text at the very top. Empty string hides it.
  promo: 'Updated for NBA 2K27 · Lifetime updates included with every purchase',

  nav: [
    { label: 'Swish', href: '/swish' },
    { label: 'Features', href: '/swish#features' },
    { label: 'Setup', href: '/guides' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/#faq' },
  ],

  footer: {
    product: [
      { label: 'Swish for NBA 2K27', href: '/swish' },
      { label: 'All features', href: '/swish#features' },
      { label: 'Pricing', href: '/swish#pricing' },
    ],
    support: [
      { label: 'Setup guide', href: '/guides' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/#faq' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Refund Policy', href: '/legal/refund' },
    ],
  },
} as const

export type Site = typeof site
