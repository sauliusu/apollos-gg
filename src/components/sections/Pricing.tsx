import { Check, CreditCard, Infinity as InfinityIcon, ShieldCheck, Zap } from 'lucide-react'
import type { Product } from '@/data/product'
import { formatPrice, savePercent } from '@/lib/utils'
import { Container, Section } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { BuyButton } from '@/components/checkout/BuyButton'

const PERKS = [
  { icon: Zap, title: 'Instant delivery', text: 'Download from Whop the second payment clears.' },
  { icon: InfinityIcon, title: 'Lifetime updates', text: 'Every 2K27 patch and season, free.' },
  { icon: ShieldCheck, title: 'Hardware level', text: 'Nothing installed on your console.' },
  { icon: CreditCard, title: 'Pay how you like', text: 'Card, Apple Pay, Google Pay, crypto.' },
]

export function Pricing({ product }: { product: Product }) {
  return (
    <Section id="pricing" className="bg-ink-2">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green">Pricing</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              One price. <span className="text-green">Own it forever.</span>
            </h2>
            <p className="mt-4 max-w-md text-fg-2">
              No subscription, no season pass, no per-update fee. Buy {product.name} once and every update for {product.game} is
              yours.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {PERKS.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green/10">
                    <p.icon className="h-5 w-5 text-green" />
                  </span>
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-fg-3">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-green/10 blur-2xl" />
            <div className="relative rounded-3xl border border-green/30 bg-ink p-8 shadow-glow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-3">{product.game}</p>
                  <h3 className="font-display text-3xl font-bold">{product.name}</h3>
                </div>
                <Badge tone="amber">Save {savePercent(product.price, product.originalPrice)}%</Badge>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold tracking-tight">{formatPrice(product.price)}</span>
                <span className="text-lg text-fg-3 line-through">{formatPrice(product.originalPrice)}</span>
              </div>
              <p className="mt-1 text-sm text-fg-3">One-time payment. Lifetime access.</p>

              <ul className="mt-6 space-y-2.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-fg-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                    {h}
                  </li>
                ))}
              </ul>

              <BuyButton product={product} className="mt-8 w-full" />
              <p className="mt-3 text-center text-xs text-fg-3">Secure checkout by Whop. Delivered instantly.</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
