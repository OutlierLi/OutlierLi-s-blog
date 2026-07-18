import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { AstroIntegration } from 'astro'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkMath from 'remark-math'

import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
import remarkReadingTime from './src/plugins/remark-reading-time.ts'
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

const excludedSitemapPathPatterns = [/^\/404\/?$/, /^\/search\/?$/, /^\/api(?:\/|$)/]

const shouldIncludeInSitemap = (page: string) => {
  const { pathname } = new URL(page)
  return !excludedSitemapPathPatterns.some((pattern) => pattern.test(pathname))
}

const exposeSingleSitemap = (): AstroIntegration => ({
  name: 'expose-single-sitemap',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const outputDir = fileURLToPath(dir)
      await copyFile(join(outputDir, 'sitemap-0.xml'), join(outputDir, 'sitemap.xml'))
    }
  }
})

const bilingualReadingTime = (): AstroIntegration => ({
  name: 'bilingual-reading-time',
  hooks: {
    'astro:config:setup': ({ updateConfig }) => {
      updateConfig({
        markdown: {
          remarkPlugins: [remarkReadingTime]
        }
      })
    }
  }
})

export default defineConfig({
  site: 'https://outlierli-s-blog.pages.dev',
  trailingSlash: 'never',
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  integrations: [
    sitemap({
      filter: shouldIncludeInSitemap
    }),
    exposeSingleSitemap(),
    AstroPureIntegration(config),
    bilingualReadingTime(),
    react()
  ],
  prefetch: true,
  server: {
    host: true
  },
  markdown: {
    remarkPlugins: [remarkMath, remarkCjkFriendly],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ] as NonNullable<NonNullable<import('astro').AstroUserConfig['markdown']>['shikiConfig']>['transformers']
    }
  },
  experimental: {
    contentIntellisense: true
  },
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom']
    },
    ssr: {
      external: ['@resvg/resvg-js'],
      noExternal: ['satori']
    },
    optimizeDeps: {
      include: ['satori', 'base64-js'],
      esbuildOptions: {
        plugins: [
          {
            name: 'externalize-virtual-modules',
            setup(build) {
              build.onResolve({ filter: /^virtual:/ }, (args) => ({
                path: args.path,
                external: true
              }))
            }
          }
        ]
      }
    }
  }
})
