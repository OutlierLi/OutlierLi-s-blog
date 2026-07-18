import type { Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  title: 'OuterLi Blog',
  author: 'OuterLi',
  description: '技术文章、摄影、读书、观影和随想。',
  favicon: '/favicon/favicon.svg',
  locale: {
    lang: 'zh-CN',
    attrs: 'zh_CN',
    dateLocale: 'zh-CN',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  logo: {
    src: 'src/assets/avatar.svg',
    alt: 'OuterLi'
  },
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',
  head: [],
  customCss: [],
  header: {
    menu: [
      { title: '技术文章', link: '/blog' },
      { title: '摄影', link: '/photography' },
      { title: '读书', link: '/reading' },
      { title: '观影', link: '/films' },
      { title: '随想', link: '/thoughts' },
      { title: '关于', link: '/about' }
    ]
  },
  footer: {
    links: [],
    credits: true,
    social: {
      github: 'https://github.com/OutlierLi'
    }
  },
  content: {
    externalLinksContent: ' ↗',
    blogPageSize: 8,
    externalLinkArrow: true,
    share: ['weibo', 'x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    logbook: [],
    applyTip: [
      { name: 'Name', val: theme.title },
      { name: 'Desc', val: theme.description || 'Null' },
      { name: 'Link', val: 'https://outlierli-s-blog.pages.dev/' },
      { name: 'Avatar', val: 'https://outlierli-s-blog.pages.dev/favicon/favicon.svg' }
    ]
  },
  pagefind: false,
  quote: {
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'OuterLi Blog'`
  },
  typography: {
    class: 'prose text-base text-muted-foreground'
  },
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  waline: {
    enable: false,
    server: '',
    additionalConfigs: {
      pageview: false,
      comment: false
    }
  }
}

const config = { ...theme, integ } as Config
export default config
