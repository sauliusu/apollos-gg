const ITEMS = [
  'PS5',
  'Xbox Series X|S',
  'PC',
  'Park',
  'Rec',
  'MyCareer',
  'ProAm',
  'Updated every 2K27 patch',
  'Lifetime updates',
  '24/7 Discord support',
  'Setup in 2 minutes',
]

/** Slow scrolling strip of trust points. Pure CSS, no JS. */
export function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-2 to-transparent" />
      <ul className="flex w-max animate-marquee gap-10 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-fg-3">
        {row.map((item, i) => (
          <li key={i} className="flex items-center gap-10">
            {item}
            <span className="h-1 w-1 rounded-full bg-green" />
          </li>
        ))}
      </ul>
    </div>
  )
}
