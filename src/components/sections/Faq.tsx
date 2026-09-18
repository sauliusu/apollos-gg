import { ChevronDown } from 'lucide-react'
import { FAQ } from '@/data/product'
import { site } from '@/config/site'
import { Container, Section, SectionHeading } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

/** Native <details> accordion: accessible, no JavaScript, and Google can read every answer. */
export function Faq() {
  return (
    <Section id="faq" className="bg-ink-2">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="Questions, answered" text="Anything else, support answers around the clock." />
          {site.discordInvite && (
            <Button href={site.discordInvite} external variant="secondary" className="mt-6">
              Ask in Discord
            </Button>
          )}
        </div>
        <div className="divide-y divide-line rounded-3xl border border-line bg-ink">
          {FAQ.map((f) => (
            <details key={f.id} id={f.id} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-fg-3 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}
