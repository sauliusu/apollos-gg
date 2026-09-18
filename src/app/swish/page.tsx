import type { Metadata } from 'next'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { breadcrumbLd, faqLd, graph, JsonLd, productLd } from '@/lib/seo'
import { getAllPosts } from '@/lib/blog'
import { Hero } from '@/components/sections/Hero'
import { Included } from '@/components/sections/Included'
import { FeatureShowcase } from '@/components/sections/FeatureShowcase'
import { Pricing } from '@/components/sections/Pricing'
import { Faq } from '@/components/sections/Faq'
import { RelatedPosts } from '@/components/sections/RelatedPosts'
import { FinalCta } from '@/components/sections/FinalCta'
import { StickyCta } from '@/components/layout/StickyCta'

const product = SWISH

export const metadata: Metadata = {
  title: `${product.name} for ${product.game}: auto green, button tempo, dunk meter`,
  description: product.description,
  alternates: { canonical: product.path },
  openGraph: {
    type: 'website',
    title: `${product.name} for ${product.game} | ${site.name}`,
    description: product.description,
    url: product.path,
  },
}

export default function SwishPage() {
  const posts = getAllPosts().slice(0, 3)
  return (
    <>
      <JsonLd data={graph(productLd(product), faqLd(), breadcrumbLd([{ name: `${product.name} for ${product.game}`, path: product.path }]))} />
      <Hero product={product} />
      <Included product={product} />
      <FeatureShowcase product={product} />
      <Pricing product={product} />
      <Faq />
      <RelatedPosts posts={posts} title="Read before you buy" />
      <FinalCta product={product} />
      <StickyCta product={product} />
    </>
  )
}
