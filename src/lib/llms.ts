import { site } from '@/config/site'
import { FAQ, PRODUCTS, STEPS } from '@/data/product'
import { formatPrice } from '@/lib/utils'
import { getAllPosts, type Post } from '@/lib/blog'

/**
 * Plain-text descriptions of the site for AI assistants, served at /llms.txt (index) and
 * /llms-full.txt (everything). Format follows llmstxt.org: an H1, a blockquote summary,
 * then H2 sections of links with one-line descriptions.
 */

function stripHtml(html: string) {
  return html
    .replace(/<\/(p|h[1-6]|li|tr|blockquote|pre)>/g, '\n')
    .replace(/<li>/g, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function llmsIndex(posts: Post[] = getAllPosts()) {
  const lines: string[] = []
  lines.push(`# ${site.name}`)
  lines.push('')
  lines.push(`> ${site.tagline}. ${site.description}`)
  lines.push('')
  lines.push(
    `${site.name} sells Cronus Zen scripts for NBA 2K. A Cronus Zen is a hardware adapter that sits between a controller and a PlayStation, Xbox or PC and runs scripts written in GPC. ${site.name} focuses on one game so the script can be updated the same day 2K patches.`,
  )
  lines.push('')
  lines.push('## Products')
  lines.push('')
  for (const p of PRODUCTS) {
    lines.push(`- [${p.name} for ${p.game}](${site.url}${p.path}): ${p.description} Price ${formatPrice(p.price)} one-time, lifetime updates.`)
  }
  lines.push('')
  lines.push('## Guides')
  lines.push('')
  lines.push(`- [Setup guide](${site.url}/guides): How to load a script onto a Cronus Zen with Zen Studio and tune it from the OLED menu.`)
  for (const post of posts) {
    lines.push(`- [${post.title}](${site.url}/blog/${post.slug}): ${post.description}`)
  }
  lines.push('')
  lines.push('## Company')
  lines.push('')
  lines.push(`- [About](${site.url}/about): Who runs ${site.name} and how support works.`)
  lines.push(`- [FAQ](${site.url}/#faq): Bans, platforms, jumpshots, setup time, updates, refunds.`)
  lines.push(`- [Terms](${site.url}/legal/terms), [Privacy](${site.url}/legal/privacy), [Refunds](${site.url}/legal/refund)`)
  lines.push('')
  lines.push('## Full content')
  lines.push('')
  lines.push(`- [llms-full.txt](${site.url}/llms-full.txt): Every page on this site as plain text.`)
  lines.push(`- [Sitemap](${site.url}/sitemap.xml)`)
  lines.push(`- [RSS](${site.url}/feed.xml)`)
  return lines.join('\n') + '\n'
}

export function llmsFull(posts: Post[] = getAllPosts()) {
  const out: string[] = [llmsIndex(posts), '---', '']

  for (const p of PRODUCTS) {
    out.push(`# ${p.name} for ${p.game}`)
    out.push('')
    out.push(`URL: ${site.url}${p.path}`)
    out.push(`Price: ${formatPrice(p.price)} one-time (list ${formatPrice(p.originalPrice)}). Lifetime updates. Payment via Whop.`)
    out.push(`Platforms: PS5, PS4, Xbox Series X|S, Xbox One, PC (via Cronus Zen).`)
    out.push(`Status: ${p.status}`)
    out.push('')
    out.push(p.subheadline)
    out.push('')
    out.push('## Features')
    out.push('')
    for (const f of p.features) out.push(`- **${f.title}** (${f.group}): ${f.description}`)
    out.push('')
    out.push("## What's included")
    out.push('')
    for (const col of p.included) {
      out.push(`### ${col.title}`)
      out.push('')
      for (const item of col.items) out.push(`- ${item}`)
      out.push('')
    }
  }

  out.push('# Setup')
  out.push('')
  out.push(`URL: ${site.url}/guides`)
  out.push('')
  for (const s of STEPS) out.push(`${s.n}. **${s.title}**: ${s.text}`)
  out.push('')

  out.push('# FAQ')
  out.push('')
  for (const f of FAQ) {
    out.push(`## ${f.q}`)
    out.push('')
    out.push(f.a)
    out.push('')
  }

  for (const post of posts) {
    out.push('---')
    out.push('')
    out.push(`# ${post.title}`)
    out.push('')
    out.push(`URL: ${site.url}/blog/${post.slug}`)
    out.push(`Published: ${post.date}${post.updated ? ` · Updated: ${post.updated}` : ''}`)
    out.push('')
    out.push(post.description)
    out.push('')
    out.push(stripHtml(post.html))
    out.push('')
  }

  return out.join('\n')
}
