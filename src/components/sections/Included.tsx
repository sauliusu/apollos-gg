import { Check } from 'lucide-react'
import type { Product } from '@/data/product'
import { Container, Section, SectionHeading } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function Included({ product }: { product: Product }) {
  const total = product.included.reduce((n, c) => n + c.items.length, 0)
  return (
    <Section id="included" className="bg-ink-2">
      <Container>
        <SectionHeading
          eyebrow="What's included"
          title={`${total} things you get with ${product.name}`}
          text="Every mod ships in one file. Toggle what you want from the Zen's OLED menu, nothing needs a PC after setup."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {product.included.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-line bg-ink p-6 shadow-card">
                <h3 className="font-display text-xl font-bold">{col.title}</h3>
                <p className="mt-1 text-sm text-fg-3">{col.blurb}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-fg-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
