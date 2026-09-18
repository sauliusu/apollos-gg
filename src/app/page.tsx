import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { FeatureShowcase } from '@/components/sections/FeatureShowcase'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Pricing } from '@/components/sections/Pricing'
import { Reviews } from '@/components/sections/Reviews'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { StickyCta } from '@/components/layout/StickyCta'

/**
 * Home. Sections are plain components: reorder, remove or add one here.
 */
export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        sameAs: [site.discordInvite, ...Object.values(site.socials).filter(Boolean)],
      },
      {
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
