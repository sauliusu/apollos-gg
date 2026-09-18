import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { PRODUCTS } from '@/data/product'
import { LEGAL } from '@/data/legal'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const posts = getAllPosts()
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...PRODUCTS.map((p) => ({ url: `${site.url}${p.path}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 })),
    { url: `${site.url}/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/blog`, lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : now, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...LEGAL.map((l) => ({ url: `${site.url}/legal/${l.slug}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.2 })),
  ]
}
