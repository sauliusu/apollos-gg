import type { Product } from '@/data/product'
import { site } from '@/config/site'
import { formatPrice } from '@/lib/utils'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { BuyButton } from '@/components/checkout/BuyButton'

export function FinalCta({ product }: { product: Product }) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-2 px-6 py-16 text-center sm:px-12">
          <div className="court-grid pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-green/15 blur-[100px]" />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Stop guessing the <span className="text-green text-glow">green</span> window.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-fg-2">
              {product.name} for {product.game} is {formatPrice(product.price)} once, with every update included. Set up in two
              minutes, tuned from the Zen screen.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BuyButton product={product} showPrice />
              <Button href={site.discordInvite || '/guides'} external={!!site.discordInvite} variant="secondary" size="lg">
                {site.discordInvite ? 'Talk to us first' : 'Read the setup guide'}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
