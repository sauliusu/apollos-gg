import { Sparkles } from 'lucide-react'
import { site } from '@/config/site'

export function PromoBar() {
  if (!site.promo) return null
  return (
    <div className="bg-green text-green-ink">
      <p className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5 text-center text-xs font-semibold sm:text-[13px]">
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        {site.promo}
      </p>
    </div>
  )
}
