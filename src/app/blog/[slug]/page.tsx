import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { formatDate, getAllPosts, getPost } from '@/lib/blog'
import { Container, Section } from '@/components/ui/Container'
import { BuyButton } from '@/components/checkout/BuyButton'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  }
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  }

  return (
    <Section>
      <Container className="max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-fg-3 hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>
        <header className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green">
            {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-fg-2">{post.description}</p>
        </header>

        <article className="prose-blog mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-green/30 bg-ink-2 p-6 shadow-glow sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold">
              {SWISH.name} for {SWISH.game}
            </p>
            <p className="mt-1 text-sm text-fg-2">Everything in this post, automated on your Zen.</p>
          </div>
          <BuyButton product={SWISH} size="md" showPrice />
        </aside>
      </Container>
    </Section>
  )
}
