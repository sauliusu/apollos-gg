import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

/**
 * Page section with consistent vertical rhythm. Give it an id to make it linkable from the nav.
 */
export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('py-16 sm:py-24 scroll-mt-24', className)}>
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  text?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-fg-2 sm:text-lg">{text}</p>}
    </div>
  )
}
