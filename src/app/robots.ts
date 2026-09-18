import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

/**
 * Crawler policy. Search engines and AI assistants are all welcome; the only paths kept out
 * are the post-checkout page and Next internals. AI crawlers are listed explicitly because
 * some of them only honour rules addressed to them by name.
 */
const DISALLOW = ['/success', '/api/', '/_next/']

const AI_CRAWLERS = [
  'GPTBot', // OpenAI training + ChatGPT browsing
  'OAI-SearchBot', // ChatGPT search results
  'ChatGPT-User', // ChatGPT live fetches
  'ClaudeBot', // Anthropic
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini grounding
  'Applebot-Extended', // Apple Intelligence
  'Bingbot',
  'DuckAssistBot',
  'meta-externalagent',
  'Amazonbot',
  'YouBot',
  'cohere-ai',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
