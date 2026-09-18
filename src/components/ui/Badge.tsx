import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Badge({
  children,
  tone = 'green',
  className,
}: {
  children: ReactNode
  tone?: 'green' | 'amber' | 'neutral'
  className?: string
}) {
  const tones = {
    green: 'border-green/30 bg-green/10 text-green',
    amber: 'border-amber/30 bg-amber/10 text-amber',
    neutral: 'border-line-2 bg-ink-3 text-fg-2',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
