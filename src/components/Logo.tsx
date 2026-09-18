import { cn } from '@/lib/utils'
import { site } from '@/config/site'

/**
 * Logo mark: a shot arc ending in a green dot (the perfect release).
 * Pure SVG so it stays crisp at every size and recolours with `currentColor`.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('h-7 w-7', className)}>
      <path
        d="M4 24 C 8 8, 20 6, 27 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="27" cy="11" r="3.2" className="fill-green" />
      <path d="M4 28 h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".35" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 text-fg', className)}>
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight">
        {site.name}
        <span className="text-green">.</span>
      </span>
    </span>
  )
}
