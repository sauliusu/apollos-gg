import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { site } from '@/config/site'
import { formatDate, getAllPosts } from '@/lib/blog'
import { Container, Section, SectionHeading } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Blog: NBA 2K27 Cronus Zen guides and settings',
  description: `Guides, timing settings and patch notes for NBA 2K27 on the Cronus Zen from ${site.name}.`,
  alternates: { canonical: '/blog' },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Blog" title="Guides, settings and patch notes" text="Everything we learn about 2K27 on the Zen, written down." />
        {posts.length === 0 ? (
          <p className="mt-10 text-fg-3">No posts yet.</p>
        ) : (
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-6 transition-colors hover:border-line-2 hover:bg-ink-3"
                >
                  <p className="text-xs text-fg-3">
                    {formatDate(p.date)} · {p.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 font-display text-xl font-bold group-hover:text-green">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-2">{p.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
                    Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
