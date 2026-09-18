'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { WhopCheckoutEmbed } from '@whop/checkout/react'
import { Check, ShieldCheck, X } from 'lucide-react'
import type { Product } from '@/data/product'
import { formatPrice } from '@/lib/utils'

export function CheckoutModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const router = useRouter()
  const planId = product.whopPlanId
  const configured = planId.startsWith('plan_')

  // Lock the page behind the modal and close on Escape.
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-line bg-ink-2 shadow-card sm:flex-row sm:rounded-2xl">
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute right-3 top-3 z-20 rounded-full bg-black/40 p-2 text-fg-2 hover:text-fg"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Summary */}
        <aside className="hidden w-72 shrink-0 flex-col border-r border-line bg-ink-3 p-6 sm:flex">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green">{product.game}</p>
          <h3 className="mt-1 font-display text-2xl font-bold">{product.name}</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold">{formatPrice(product.price)}</span>
            <span className="text-sm text-fg-3 line-through">{formatPrice(product.originalPrice)}</span>
          </div>
          <p className="mt-1 text-xs text-fg-3">One-time payment. Lifetime access and updates.</p>

          <ul className="mt-6 space-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-fg-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-2 pt-6 text-xs text-fg-3">
            <ShieldCheck className="h-4 w-4 text-green" />
            Secure checkout powered by Whop
          </div>
        </aside>

        {/* Embed */}
        <div className="min-h-[26rem] flex-1 overflow-y-auto">
          {configured ? (
            <WhopCheckoutEmbed
              key={planId}
              planId={planId}
              theme="dark"
              skipRedirect
              returnUrl={typeof window !== 'undefined' ? `${window.location.origin}/success` : undefined}
              onComplete={() => {
                onClose()
                router.push('/success')
              }}
              fallback={
                <div className="flex min-h-[26rem] flex-col items-center justify-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-line-2 border-t-green" />
                  <span className="text-xs text-fg-3">Loading secure checkout…</span>
                </div>
              }
            />
          ) : (
            <div className="flex min-h-[26rem] flex-col items-center justify-center px-8 text-center">
              <p className="font-semibold">Checkout is being set up</p>
              <p className="mt-1 text-sm text-fg-3">{product.name} is not on sale yet. Check back shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
