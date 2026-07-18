import type { APIRoute } from 'astro'
import { defaultOgPng } from '@/lib/og'

export const prerender = true

export const GET: APIRoute = async () => {
  const png = await defaultOgPng({
    name: 'OuterLi Blog',
    tagline: '技术文章、摄影、读书、观影和随想'
  })
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
