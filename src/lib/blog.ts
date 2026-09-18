import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

/**
 * Blog posts are Markdown files in /content/blog. Frontmatter:
 *   title, description, date (YYYY-MM-DD), optional tags (list), optional updated.
 * The file name is the URL slug: content/blog/green-timing.md -> /blog/green-timing
 */
export type Post = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  html: string
  readingMinutes: number
}

const DIR = path.join(process.cwd(), 'content', 'blog')

function read(slug: string): Post | null {
  const file = path.join(DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  const words = content.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    html: marked.parse(content, { async: false }) as string,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => read(f.replace(/\.md$/, '')))
    .filter((p): p is Post => !!p && !!p.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | null {
  return read(slug)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
