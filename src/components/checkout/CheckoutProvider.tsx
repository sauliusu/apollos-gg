'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '@/data/product'
import { CheckoutModal } from './CheckoutModal'

type CheckoutContext = {
  open: (product: Product) => void
  close: () => void
}

const Ctx = createContext<CheckoutContext | null>(null)

/**
 * Mount once in the root layout. Any component can then call `useCheckout().open(product)`
 * to pop the Whop checkout for that product.
 */
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null)

  const open = useCallback((p: Product) => setProduct(p), [])
  const close = useCallback(() => setProduct(null), [])
  const value = useMemo(() => ({ open, close }), [open, close])

  return (
    <Ctx.Provider value={value}>
      {children}
      {product && <CheckoutModal product={product} onClose={close} />}
    </Ctx.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCheckout must be used inside <CheckoutProvider>')
  return ctx
}
