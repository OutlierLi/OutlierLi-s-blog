export type SectionKey = 'photography' | 'reading' | 'films' | 'thoughts'

export const contentSections: Record<
  SectionKey,
  {
    title: string
    description: string
    tag: string
    empty: string
  }
> = {
  photography: {
    title: '摄影',
    description: '用图片记录城市、旅行、日常和偶然出现的光。',
    tag: 'photography',
    empty: '摄影作品还在整理中。'
  },
  reading: {
    title: '读书',
    description: '读书笔记、摘录、观点和阶段性的知识整理。',
    tag: 'reading',
    empty: '读书记录还在整理中。'
  },
  films: {
    title: '观影',
    description: '电影、剧集和影像作品带来的感受与思考。',
    tag: 'film',
    empty: '观影记录还在整理中。'
  },
  thoughts: {
    title: '随想',
    description: '一些不一定完整，但值得留下的观察、念头和生活片段。',
    tag: 'thought',
    empty: '随想内容还在整理中。'
  }
}
