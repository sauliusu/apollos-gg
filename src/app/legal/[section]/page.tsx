import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LEGAL, legalBySlug } from '@/data/legal'
import { cn } from '@/lib/utils'
import { Container, Section } from '@/components/ui/Container'

export function generateStaticParams() {
  return LEGAL.map((l) => ({ section: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params
  const doc = legalBySlug(section)
  if (!doc) return {}
  return { title: doc.title, alternates: { canonical: `/legal/${doc.slug}` }, robots: { index: false, follow: true } }
}

export default async function LegalPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const doc = legalBySlug(section)
  if (!doc) notFound()

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Legal" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto scrollbar-none lg:flex-col">
            {LEGAL.map((l) => (
              <li key={l.slug} className="shrink-0">
                <Link
                  href={`/legal/${l.slug}`}
                  className={cn(
                    'block rounded-full px-4 py-2 text-sm font-medium lg:rounded-xl',
                    l.slug === doc.slug ? 'bg-green/10 text-green' : 'text-fg-2 hover:bg-white/5 hover:text-fg',
                  )}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{doc.title}</h1>
          <p className="mt-2 text-sm text-fg-3">Last updated {doc.updated}</p>
          {doc.blocks.map((b) => (
            <section key={b.heading} className="mt-8">
              <h2 className="font-display text-lg font-bold">{b.heading}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-2">
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </Container>
    </Section>
  )
}
