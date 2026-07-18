export const CONTENT_SECTIONS = [
  {
    key: "tech",
    title: "技术文章",
    href: "/tech/",
    description: "工程实践、AI、工具链和系统化技术写作。",
    empty: "技术文章会收纳工程实践、AI 工具链和问题复盘。",
  },
  {
    key: "photography",
    title: "摄影",
    href: "/photography/",
    description: "影像、器材、城市观察和照片背后的现场。",
    empty: "摄影页面会用于整理照片、拍摄记录和视觉观察。",
  },
  {
    key: "reading",
    title: "读书",
    href: "/reading/",
    description: "书摘、阅读笔记，以及长期反复咀嚼的观点。",
    empty: "读书页面会沉淀书摘、读后感和主题阅读线索。",
  },
  {
    key: "films",
    title: "观影",
    href: "/films/",
    description: "电影、剧集、纪录片，以及一点私人片单。",
    empty: "观影页面会记录电影、剧集、纪录片和片单。",
  },
  {
    key: "thoughts",
    title: "随想",
    href: "/thoughts/",
    description: "不急着成文的观察、片段和日常思考。",
    empty: "随想页面会保存短想法、日常观察和还没成稿的片段。",
  },
] as const;

export type ContentSectionKey = (typeof CONTENT_SECTIONS)[number]["key"];

export const getContentSection = (key: ContentSectionKey) =>
  CONTENT_SECTIONS.find(section => section.key === key);
