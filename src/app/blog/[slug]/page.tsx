import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { formatDate, getAllPosts, getPost } from '@/lib/blog'
import { articleLd, breadcrumbLd, graph, JsonLd } from '@/lib/seo'
import { Container, Section } from '@/components/ui/Container'
import { BuyButton } from '@/components/checkout/BuyButton'
import { RelatedPosts } from '@/components/sections/RelatedPosts'

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
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.url],
      tags: post.tags,
    },
  }
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <JsonLd
            data={graph(
              articleLd(post),
              breadcrumbLd([
                { name: 'Blog', path: '/blog' },
                { name: post.title, path: `/blog/${post.slug}` },
              ]),
            )}
          />
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-fg-3">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-fg">
              Blog
            </Link>
          </nav>
          <header className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
              {post.updated && (
                <>
                  {' '}
                  · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-fg-2">{post.description}</p>
          </header>

          <article className="prose-blog mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border border-line bg-ink-2 px-3 py-1 text-xs text-fg-3">
                  {t}
                </li>
              ))}
            </ul>
          )}

          <aside className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-green/30 bg-ink-2 p-6 shadow-glow sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold">
                <Link href={SWISH.path} className="hover:text-green">
                  {SWISH.name} for {SWISH.game}
                </Link>
              </p>
              <p className="mt-1 text-sm text-fg-2">
                Everything in this post, automated on your Zen.{' '}
                <Link href="/guides" className="text-green underline underline-offset-2">
                  Setup takes two minutes.
                </Link>
              </p>
            </div>
            <BuyButton product={SWISH} size="md" showPrice />
          </aside>
        </Container>
      </Section>
      <RelatedPosts posts={related} title="Keep reading" />
    </>
  )
}
