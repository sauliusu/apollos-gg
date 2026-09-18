import { STEPS } from '@/data/product'
import { Container, Section, SectionHeading } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Setup" title="Playing in two minutes" text="No PC in the loop after the first load. Everything lives on the Zen." />
          <Button href="/guides" variant="secondary">
            Read the full guide
          </Button>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <li className="relative h-full rounded-3xl border border-line bg-ink-2 p-6">
                <span className="font-display text-5xl font-bold text-green/25">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
