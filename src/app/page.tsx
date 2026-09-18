import type { Metadata } from 'next'
import { SWISH } from '@/data/product'
import { faqLd, graph, JsonLd, productLd } from '@/lib/seo'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { FeatureShowcase } from '@/components/sections/FeatureShowcase'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { Reviews } from '@/components/sections/Reviews'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { StickyCta } from '@/components/layout/StickyCta'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/**
 * Home. Sections are plain components: reorder, remove or add one here.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(productLd(SWISH), faqLd())} />
      <Hero product={SWISH} />
      <Marquee />
      <FeatureShowcase product={SWISH} />
      <HowItWorks />
      <Pricing product={SWISH} />
      <Reviews />
      <Faq />
      <FinalCta product={SWISH} />
      <StickyCta product={SWISH} />
    </>
  )
}
