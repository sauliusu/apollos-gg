import { site } from '@/config/site'
import { FAQ, PRODUCTS, type Product } from '@/data/product'
import type { Post } from '@/lib/blog'

/**
 * Structured data builders. Every page emits JSON-LD through these so the vocabulary stays
 * consistent (same Organization id, same Brand, same URL shapes).
 */

const ORG_ID = `${site.url}/#organization`
const SITE_ID = `${site.url}/#website`

export function organizationLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: site.url,
    logo: { '@type': 'ImageObject', url: `${site.url}/icon.svg` },
    sameAs: [site.discordInvite, ...Object.values(site.socials)].filter(Boolean),
    ...(site.supportEmail ? { contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: site.supportEmail } } : {}),
  }
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

export function productLd(p: Product) {
  return {
    '@type': 'Product',
    '@id': `${site.url}${p.path}#product`,
    name: `${p.name} for ${p.game}`,
    alternateName: `${p.game} Cronus Zen script`,
    description: p.description,
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@id': ORG_ID },
    category: 'Video game controller script',
    image: `${site.url}/opengraph-image`,
    url: `${site.url}${p.path}`,
    offers: {
      '@type': 'Offer',
      url: `${site.url}${p.path}`,
      price: p.price,
      priceCurrency: 'USD',
      availability: p.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
      // Digital download, no shipping.
      deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModeDirectDownload',
    },
    additionalProperty: p.features.map((f) => ({ '@type': 'PropertyValue', name: f.title, value: f.description })),
  }
}

export function faqLd() {
  return {
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === '/' ? '' : it.path}`,
    })),
  }
}

export function articleLd(post: Post) {
  return {
    '@type': 'Article',
    '@id': `${site.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    image: `${site.url}/opengraph-image`,
    keywords: post.tags.join(', '),
    inLanguage: 'en',
    about: PRODUCTS.map((p) => ({ '@id': `${site.url}${p.path}#product` })),
  }
}

/** Wraps any number of nodes in one @graph so a page emits a single script tag. */
export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
