import { Star } from 'lucide-react'
import { REVIEWS, type Review } from '@/data/product'
import { Container, Section, SectionHeading } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber text-amber" />
      ))}
    </span>
  )
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-6">
      {r.video && (
        <video src={r.video} controls muted playsInline preload="metadata" className="mb-5 aspect-video w-full rounded-xl bg-black" />
      )}
      <Stars />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-fg-2">“{r.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {r.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green/15 font-display text-sm font-bold text-green">
            {r.name[0]}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold">{r.name}</p>
          <p className="text-xs text-fg-3">{r.platform}</p>
        </div>
      </figcaption>
    </figure>
  )
}

export function Reviews() {
  return (
    <Section id="reviews">
      <Container>
        <SectionHeading eyebrow="Reviews" title="From the Rec, not a template" text="What people say after their first session." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08}>
              <ReviewCard r={r} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
