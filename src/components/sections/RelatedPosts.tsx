import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/blog'
import { formatDate } from '@/lib/blog'
import { Container, Section, SectionHeading } from '@/components/ui/Container'

/** Internal links from product and post pages into the blog. Renders nothing with no posts. */
export function RelatedPosts({ posts, title = 'From the blog' }: { posts: Post[]; title?: string }) {
  if (posts.length === 0) return null
  return (
    <Section className="bg-ink-2">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Blog" title={title} />
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-green">
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-ink p-5 transition-colors hover:border-line-2">
                <p className="text-xs text-fg-3">
                  {formatDate(p.date)} · {p.readingMinutes} min
                </p>
                <h3 className="mt-2 font-semibold group-hover:text-green">{p.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-fg-3">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
