import { Check, Star } from 'lucide-react'
import type { Product } from '@/data/product'
import { formatPrice, savePercent } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BuyButton } from '@/components/checkout/BuyButton'

export function Hero({ product }: { product: Product }) {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="court-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-green/10 blur-[120px]" />

      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{product.game} only</Badge>
            <Badge tone="neutral">
              <Star className="h-3 w-3 fill-amber text-amber" />
              Updated every patch
            </Badge>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {product.headline.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-green text-glow">{product.headline.split(' ').slice(-1)}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-2">{product.subheadline}</p>

          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {product.checklist.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-fg-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/15">
                  <Check className="h-3 w-3 text-green" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <BuyButton product={product} showPrice />
            <Button href={`${product.path}#features`} variant="secondary" size="lg">
              See every feature
            </Button>
          </div>

          <p className="mt-4 text-sm text-fg-3">
            <span className="font-semibold text-fg">{formatPrice(product.price)}</span> one-time ·{' '}
            <span className="line-through">{formatPrice(product.originalPrice)}</span> ·{' '}
            <span className="text-green">save {savePercent(product.price, product.originalPrice)}%</span> · lifetime updates
          </p>
        </div>

        {/* Media */}
        <div className="animate-fade-up relative [animation-delay:120ms]">
          <div className="absolute -inset-4 rounded-[2rem] bg-green/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-line-2 bg-ink-3 shadow-card">
            <video
              src={product.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover"
            />
            <div className="flex items-center justify-between border-t border-line px-4 py-3 text-xs text-fg-3">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-green" />
                  <span className="relative h-2 w-2 rounded-full bg-green" />
                </span>
                {product.name} running on a Zen
              </span>
              <span>PS5 · Xbox · PC</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
