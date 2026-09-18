'use client'

import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import type { Feature, Product } from '@/data/product'
import { cn } from '@/lib/utils'
import { Container, Section, SectionHeading } from '@/components/ui/Container'

const GROUPS: Feature['group'][] = ['Shooting', 'Playmaking', 'Defense']

/**
 * Tabbed feature browser: pick a group, pick a feature, the clip on the right switches.
 * Only the active clip is ever loaded, so the page stays light.
 */
export function FeatureShowcase({ product }: { product: Product }) {
  const [group, setGroup] = useState<Feature['group']>('Shooting')
  const inGroup = useMemo(() => product.features.filter((f) => f.group === group), [product.features, group])
  const [activeTitle, setActiveTitle] = useState<string | undefined>(inGroup[0]?.title)
  const active = inGroup.find((f) => f.title === activeTitle) ?? inGroup[0]

  const pick = (g: Feature['group']) => {
    setGroup(g)
    setActiveTitle(product.features.find((f) => f.group === g)?.title)
  }

  return (
    <Section id="features">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything inside <span className="text-green">{product.name}</span>
            </>
          }
          text={`${product.features.length} features, each with a clip of it running in ${product.game}. Click through them.`}
        />

        <div className="mt-8 flex gap-2 overflow-x-auto scrollbar-none">
          {GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => pick(g)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                g === group
                  ? 'border-green bg-green text-green-ink'
                  : 'border-line-2 bg-ink-3 text-fg-2 hover:border-fg-3 hover:text-fg',
              )}
            >
              {g}
              <span className="ml-2 text-xs opacity-60">{product.features.filter((f) => f.group === g).length}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Feature list */}
          <ul className="flex gap-2 overflow-x-auto scrollbar-none lg:flex-col lg:overflow-visible">
            {inGroup.map((f) => {
              const isActive = f.title === active?.title
              return (
                <li key={f.title} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setActiveTitle(f.title)}
                    className={cn(
                      'w-full rounded-2xl border p-4 text-left transition-all lg:w-full',
                      'min-w-[240px] lg:min-w-0',
                      isActive
                        ? 'border-green/50 bg-green/[0.07] shadow-glow'
                        : 'border-line bg-ink-2 hover:border-line-2 hover:bg-ink-3',
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={cn('font-semibold', isActive ? 'text-fg' : 'text-fg-2')}>{f.title}</span>
                      <Play className={cn('h-4 w-4 shrink-0', isActive ? 'text-green' : 'text-fg-3')} />
                    </div>
                    <p className={cn('mt-1.5 text-sm leading-relaxed', isActive ? 'text-fg-2' : 'text-fg-3 lg:line-clamp-2')}>
                      {f.description}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Player */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-line-2 bg-ink-3 shadow-card">
              {active && (
                <video
                  key={active.video}
                  src={active.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-black object-cover"
                />
              )}
              <div className="flex items-center justify-between border-t border-line px-5 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">{group}</p>
                  <p className="font-semibold">{active?.title}</p>
                </div>
                <p className="text-xs text-fg-3">
                  {inGroup.findIndex((f) => f.title === active?.title) + 1} / {inGroup.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
