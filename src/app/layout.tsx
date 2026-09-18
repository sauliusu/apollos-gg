import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { site } from '@/config/site'
import { graph, JsonLd, organizationLd, websiteLd } from '@/lib/seo'
import { CheckoutProvider } from '@/components/checkout/CheckoutProvider'
import { PromoBar } from '@/components/layout/PromoBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Pixels } from '@/components/layout/Pixels'
import './globals.css'

const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['500', '600', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.ogTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'gaming',
  keywords: [
    'NBA 2K27 Cronus Zen script',
    'NBA 2K27 auto green script',
    '2K27 zen script',
    'Cronus Zen NBA 2K',
    'auto green cronus zen',
    'NBA 2K27 button tempo script',
    'NBA 2K27 dunk meter macro',
  ],
  alternates: {
    types: { 'application/rss+xml': `${site.url}/feed.xml` },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.ogTitle,
    description: site.description,
    url: site.url,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: site.ogTitle, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: site.googleSiteVerification ? { google: site.googleSiteVerification } : undefined,
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#06090d',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={graph(organizationLd(), websiteLd())} />
        <CheckoutProvider>
          <PromoBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CheckoutProvider>
        <Pixels />
        <Analytics />
      </body>
    </html>
  )
}
