import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const prerender = true

type SearchDoc = {
  collection: 'blog'
  title: string
  description?: string
  url: string
  date: string
  tags: string[]
  body: string
}

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  const docs = posts.map<SearchDoc>((entry) => ({
    collection: 'blog',
    title: entry.data.title,
    description: entry.data.description,
    url: `/blog/${encodeURI(entry.id)}`,
    date: formatDate(entry.data.publishDate),
    tags: entry.data.tags,
    body: normalizeBody((entry as { body?: string }).body ?? '')
  }))

  return new Response(JSON.stringify(docs), {
    headers: {
      'cache-control': 'public, max-age=300',
      'content-type': 'application/json; charset=utf-8'
    }
  })
}

function normalizeBody(body: string) {
  return body
    .replace(/^[ \t]*import\s+[^\n]*\n/gm, '')
    .replace(/^[ \t]*export\s+[^\n]*\n/gm, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<([A-Z][A-Za-z0-9]*)\b[^>]*>([\s\S]*?)<\/\1>/g, '$2')
    .replace(/^[ \t]*<[A-Z][\s\S]*?\/>\s*$/gm, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|:-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatDate(date: Date | string) {
  return date instanceof Date ? date.toISOString().slice(0, 10) : String(date).slice(0, 10)
}
