import type { Metadata } from 'next'
import { Download, MonitorSmartphone, Settings2, Usb } from 'lucide-react'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { breadcrumbLd, graph, JsonLd } from '@/lib/seo'
import { Container, Section, SectionHeading } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { BuyButton } from '@/components/checkout/BuyButton'

export const metadata: Metadata = {
  title: 'Setup guide: load Swish on your Cronus Zen',
  description: `Step-by-step guide to loading the ${SWISH.name} ${SWISH.game} script onto a Cronus Zen with Zen Studio, plus starter timing settings and profile switching.`,
  alternates: { canonical: '/guides' },
}

const STEPS = [
  {
    icon: Download,
    title: 'Download the script',
    body: [
      'Open your Whop purchases page and find Swish. The download is a single .gpc file.',
      'Save it somewhere easy to find, like your Desktop. Do not rename it.',
    ],
  },
  {
    icon: Usb,
    title: 'Connect the Zen to your PC',
    body: [
      'Use the PROG (side) USB port on the Zen, not the console port, and plug it into your PC.',
      'Open Zen Studio. If it asks to update firmware, let it finish first.',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Write it to a slot',
    body: [
      'Go to the Programmer tab, drag the .gpc onto any of the eight slots, and press Program Device.',
      'When the bar finishes, unplug from the PC and connect the Zen to your console as normal.',
    ],
  },
  {
    icon: Settings2,
    title: 'Tune it from the OLED',
    body: [
      'Select the slot on the Zen. The on-screen menu lets you set green timing, release speed, tempo and toggles without a PC.',
      'Save your setup to one of the three profiles. Switch mid-game with L2 + Share.',
    ],
  },
]

const TIPS = [
  ['Green timing', 'Start at the value the guide lists for your jumpshot, then move in 10 ms steps until releases are consistent.'],
  ['Release speed', '2K27 has four: Very Quick, Quick, Normal, Slow. Match the one in your MyPlayer build.'],
  ['Shot cue', 'If you use a vibration cue, keep it under 40 ms so it fires ahead of the release, not on it.'],
  ['Profiles', 'Keep one profile per build. A shooter and a slasher want different tempo and dunk settings.'],
]

export default function GuidesPage() {
  return (
    <>
      <Section>
        <Container>
          <JsonLd data={graph(breadcrumbLd([{ name: 'Setup guide', path: '/guides' }]))} />
          <SectionHeading
            as="h1"
            eyebrow="Setup guide"
            title={
              <>
                Load <span className="text-green">{SWISH.name}</span> in two minutes
              </>
            }
            text="Four steps, no prior Zen experience needed. Support is there if you get stuck."
          />
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-line bg-ink-2 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/10">
                    <s.icon className="h-5 w-5 text-green" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-3">Step {i + 1}</span>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold">{s.title}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fg-2">
                  {s.body.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-ink-2">
        <Container>
          <SectionHeading eyebrow="Dialling it in" title="Starter settings" text="Good defaults for the first session. Tweak from there." />
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {TIPS.map(([term, text]) => (
              <div key={term} className="rounded-2xl border border-line bg-ink p-5">
                <dt className="font-semibold">{term}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-fg-2">{text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <BuyButton product={SWISH} showPrice />
            {site.discordInvite && (
              <Button href={site.discordInvite} external variant="secondary" size="lg">
                Get help in Discord
              </Button>
            )}
          </div>
        </Container>
      </Section>
    </>
  )
}
