import { ImageResponse } from 'next/og'
import { site } from '@/config/site'
import { SWISH } from '@/data/product'

export const alt = `${site.name}: ${SWISH.name} for ${SWISH.game}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Social share card, rendered at build time. Also reused as the Twitter image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(180deg, #0b1017 0%, #06090d 100%)',
          color: '#f2f6fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 700 }}>
          <svg width="44" height="44" viewBox="0 0 32 32">
            <path d="M4 24 C 8 8, 20 6, 27 11" fill="none" stroke="#f2f6fa" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="27" cy="11" r="3.2" fill="#3dfc8a" />
          </svg>
          {site.name}
          <span style={{ color: '#3dfc8a' }}>.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 30, color: '#3dfc8a', letterSpacing: 4, textTransform: 'uppercase' }}>{`${SWISH.game} · Cronus Zen`}</div>
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            Green every shot<span style={{ color: '#3dfc8a' }}>.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#a7b3c2', maxWidth: 900 }}>
            Auto green, button tempo, dunk meter, dribble combos. Updated every patch.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#66758a' }}>
          <span>{site.domain}</span>
          <span>PS5 · Xbox · PC</span>
        </div>
      </div>
    ),
    size,
  )
}
