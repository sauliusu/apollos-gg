import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,box-shadow,color] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/60 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary: 'bg-green text-green-ink hover:bg-green-2 shadow-glow',
  secondary: 'bg-ink-3 text-fg border border-line-2 hover:border-fg-3 hover:bg-ink-2',
  ghost: 'text-fg-2 hover:text-fg hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode }
type ButtonProps = Common & Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: undefined }
type LinkProps = Common & { href: string; external?: boolean }

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('href' in props && props.href) {
    const { href, external } = props
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  const rest: Record<string, unknown> = { ...props }
  for (const k of ['variant', 'size', 'className', 'children', 'href']) delete rest[k]
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
