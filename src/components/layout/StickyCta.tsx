'use client'

import { useEffect, useState } from 'react'
import type { Product } from '@/data/product'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { BuyButton } from '@/components/checkout/BuyButton'

/**
 * Bottom bar that slides in once the hero has scrolled away.
 * Pass the id of the element it should wait for (defaults to the hero).
 */
export function StickyCta({ product, watch = 'hero' }: { product: Product; watch?: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = document.getElementById(watch)
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [watch])

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 transition-transform duration-300',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!show}
    >
      <div className="mx-auto max-w-6xl px-3 pb-3 sm:px-6">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-ink-2/90 px-4 py-3 shadow-card backdrop-blur-xl">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {product.name} <span className="text-fg-3">for {product.game}</span>
            </p>
            <p className="text-xs text-fg-3">
              <span className="font-semibold text-fg">{formatPrice(product.price)}</span>{' '}
              <span className="line-through">{formatPrice(product.originalPrice)}</span> · lifetime
            </p>
          </div>
          <BuyButton product={product} size="md" />
        </div>
      </div>
    </div>
  )
}
