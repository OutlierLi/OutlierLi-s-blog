import type { APIRoute } from 'astro'
import { fetchPublicContributions } from '@/lib/github-public'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get('username') ?? 'OutlierLi'

  try {
    const body = await fetchPublicContributions(username)

    return new Response(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // Public GitHub contribution HTML is enough here: the Projects page should
        // show public activity only, without requiring a private token.
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
      }
    })
  } catch (err) {
    return json({ error: 'github public contributions failed', detail: String(err) }, 502)
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
}
