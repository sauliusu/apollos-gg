import type { Metadata } from 'next'
import { BookOpen, Download, MessageCircle } from 'lucide-react'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Purchase complete',
  robots: { index: false, follow: false },
}

const NEXT = [
  { icon: Download, title: 'Download the script', text: 'It is on your Whop purchases page now, under your email.', href: 'https://whop.com/orders', label: 'Open Whop', external: true },
  { icon: BookOpen, title: 'Load it on the Zen', text: 'Two-minute guide with the exact Zen Studio steps.', href: '/guides', label: 'Setup guide' },
  site.discordInvite
    ? { icon: MessageCircle, title: 'Join the Discord', text: 'Updates, timing settings and 24/7 help live there.', href: site.discordInvite, label: 'Join', external: true }
    : { icon: MessageCircle, title: 'Dial in your timing', text: 'Our method for finding green timing for any jumpshot.', href: '/blog/find-your-green-timing-nba-2k27', label: 'Read the guide', external: false },
]

export default function SuccessPage() {
  return (
    <Section>
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green">Order confirmed</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          You own <span className="text-green">{SWISH.name}</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-fg-2">
          Thanks for buying from {site.name}. Three things to do next, in order.
        </p>
        <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {NEXT.map((n, i) => (
            <li key={n.title} className="flex flex-col rounded-3xl border border-line bg-ink-2 p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/10">
                  <n.icon className="h-5 w-5 text-green" />
                </span>
                <span className="font-display text-2xl font-bold text-green/30">{i + 1}</span>
              </div>
              <h2 className="mt-4 font-semibold">{n.title}</h2>
              <p className="mt-1 flex-1 text-sm text-fg-3">{n.text}</p>
              <Button href={n.href} external={n.external} variant="secondary" size="sm" className="mt-5">
                {n.label}
              </Button>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
