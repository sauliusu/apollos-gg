import { site } from '@/config/site'

export type LegalSection = {
  slug: string
  title: string
  updated: string
  blocks: { heading: string; items: string[] }[]
}

const brand = site.name

export const LEGAL: LegalSection[] = [
  {
    slug: 'terms',
    title: 'Terms of Service',
    updated: '18 September 2026',
    blocks: [
      {
        heading: 'Use of the site',
        items: [
          `By using ${site.domain} you agree to these terms. If you do not agree, do not use the site or buy from it.`,
          `You agree not to use the site or any ${brand} product for illegal, malicious or unauthorised purposes.`,
          `${brand} may suspend or end your access if information you provide is false or if these terms are broken.`,
        ],
      },
      {
        heading: 'Licence',
        items: [
          'A purchase grants one personal, non-transferable licence to use the script on your own Cronus Zen.',
          'You may not share, resell, redistribute, decompile or modify the script for redistribution.',
          `${brand} may revoke access for chargebacks, fraud, tampering or policy violations.`,
        ],
      },
      {
        heading: 'Payments',
        items: [
          'Payments are processed by Whop. You authorise the charge for the listed price plus any applicable taxes.',
          'Prices may change at any time. The price shown at checkout is the price you pay.',
        ],
      },
      {
        heading: 'Disclaimer',
        items: [
          `${brand} is not affiliated with 2K, Take-Two, Sony, Microsoft or Cronus. Product names are the property of their owners.`,
          `${brand} is not liable for game or platform bans, device incompatibility, or indirect, incidental or consequential damages arising from use of a product.`,
          `${brand} may modify, suspend or discontinue any product at any time.`,
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated: '18 September 2026',
    blocks: [
      {
        heading: 'What we collect',
        items: [
          `${brand} collects the minimum needed to run the store: the email and order details Whop passes to us after a purchase, and basic analytics about site usage.`,
          'Payment details are handled by Whop and never stored by us.',
        ],
      },
      {
        heading: 'How it is used',
        items: [
          'To deliver your purchase, provide support, send product updates and prevent fraud.',
          'Analytics and advertising pixels may be used to measure campaigns. You can block these in your browser.',
        ],
      },
      {
        heading: 'Your rights',
        items: ['You can ask for a copy of your data or ask for it to be deleted by contacting support on Discord.'],
      },
    ],
  },
  {
    slug: 'refund',
    title: 'Refund Policy',
    updated: '18 September 2026',
    blocks: [
      {
        heading: 'Digital goods',
        items: ['Scripts are digital products delivered instantly. All sales are final once the file has been made available to you.'],
      },
      {
        heading: 'When a refund is considered',
        items: [
          `A refund is considered only where the issue is caused by a ${brand} error and support was unable to resolve it within a reasonable time.`,
          'Refunds are not given for change of mind, hardware you do not own, or platform incompatibility listed on the product page.',
          `Any refund or credit is at the sole discretion of ${brand}. Chargebacks result in permanent loss of access.`,
        ],
      },
    ],
  },
]

export function legalBySlug(slug: string) {
  return LEGAL.find((l) => l.slug === slug)
}
