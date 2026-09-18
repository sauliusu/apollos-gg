import type { Metadata } from 'next'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { Hero } from '@/components/sections/Hero'
import { Included } from '@/components/sections/Included'
import { FeatureShowcase } from '@/components/sections/FeatureShowcase'
import { Pricing } from '@/components/sections/Pricing'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { StickyCta } from '@/components/layout/StickyCta'

const product = SWISH

export const metadata: Metadata = {
  title: `${product.name} for ${product.game}: auto green, button tempo, dunk meter`,
  description: product.description,
  alternates: { canonical: product.path },
  openGraph: {
    title: `${product.name} for ${product.game} | ${site.name}`,
    description: product.description,
    url: product.path,
  },
}

export default function SwishPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} for ${product.game}`,
    description: product.description,
    brand: { '@type': 'Brand', name: site.name },
    category: 'Cronus Zen script',
    url: `${site.url}${product.path}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      url: `${site.url}${product.path}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero product={product} />
      <Included product={product} />
      <FeatureShowcase product={product} />
      <Pricing product={product} />
      <Faq />
      <FinalCta product={product} />
      <StickyCta product={product} />
    </>
  )
}
