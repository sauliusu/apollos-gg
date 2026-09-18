'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCheckout } from './CheckoutProvider'
import type { Product } from '@/data/product'
import { formatPrice } from '@/lib/utils'

/**
 * Drop this anywhere to sell a product. It opens the Whop checkout modal.
 */
export function BuyButton({
  product,
  size = 'lg',
  variant = 'primary',
  label,
  showPrice = false,
  className,
}: {
  product: Product
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
  label?: string
  showPrice?: boolean
  className?: string
}) {
  const { open } = useCheckout()
  const disabled = product.status !== 'available'
  const text = label ?? (disabled ? 'Updating for the latest patch' : 'Get instant access')

  return (
    <Button size={size} variant={variant} className={className} disabled={disabled} onClick={() => open(product)}>
      {text}
      {showPrice && !disabled && <span className="opacity-70">· {formatPrice(product.price)}</span>}
      {!disabled && <ArrowRight className="h-4 w-4" />}
    </Button>
  )
}
