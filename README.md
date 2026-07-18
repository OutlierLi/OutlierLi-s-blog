# Personal Blog Template

这是一个基于 [Astro](https://astro.build/) 和 [Astro Theme Pure](https://astro-pure.js.org/) 改造的个人博客，当前栏目包括技术文章、随想、读书、电影和摄影。

它不是一个无代码主题，而是一份已经跑过真实内容生产的工程模板。你可以 fork 后替换个人信息，也可以只参考其中的内容组织、双语路由、组件拆分、搜索、评论、agent-facing manifest 和 terminal dev mode。

## 功能

- Blog：技术文章，支持中英文镜像。
- Thoughts：随想。
- Books：读书。
- Movies：电影。
- Photography：摄影。
- About / Contact：个人主页常见页面。
- 中英文路由、RSS、站内搜索、评论、访问统计、OG 图片和 agent 读取接口。

## 技术栈

- Astro 5 + TypeScript
- React islands
- UnoCSS / Astro Theme Pure
- Bun
- Vercel Analytics / Speed Insights
- Waline comments

## 快速开始

环境要求：

- [Node.js](https://nodejs.org/): 18.0.0+
- [Bun](https://bun.sh/): 本项目使用 Bun 管理依赖和脚本

```shell
bun install
bun dev
```

常用命令：

```shell
bun run check
bun run build
bun preview
bun new
bun format
bun lint
```

发布前建议至少运行：

```shell
bun run check
bun run build
```

## 改成你自己的博客

优先替换这些位置：

- `src/site.config.ts`: 站点标题、作者、导航、社交链接、友链申请信息、评论服务等全局配置。
- `src/pages/about/index.astro` 和 `src/pages/en/about/index.astro`: 关于页内容。
- `src/pages/contact/index.astro` 和 `src/pages/en/contact/index.astro`: 联系方式与二维码展示。
- `src/assets/avatar.png`: 首页和站点使用的头像。
- `public/favicon/*`: 浏览器图标和 PWA 图标。
- `src/content/blog`: 正式文章。

内容频道页面位于 `src/pages/thoughts`、`src/pages/books`、`src/pages/movies` 和 `src/pages/photography`。

## 内容约定

正式博客使用文件夹组织：

```text
src/content/blog/
  20260615 - example-post/
    post.mdx
    post.en.mdx
```

中文文章默认使用 `post.mdx`。英文翻译使用同目录下的 `post.en.mdx`，并在 frontmatter 中添加：

```yaml
language: en
translationKey: '20260615---example-post/post'
```

## 本地组件清单

这些是当前仓库在主题基础上保留、改造或新增的项目本地组件：

- `AnalyticsEvents.astro`: 统一处理 `data-analytics-event` 点击上报。
- `BaseHead.astro`: SEO、OG、favicon、字体预加载、双语 hreflang。
- `Header.astro`: 双语导航、搜索入口、dev mode 入口。
- `HeroEn.astro`: 英文博客详情页 hero，修正英文 tag/link 路由。
- `LanguageSwitcher.astro`: 中英文页面切换按钮。
- `PostPreviewEn.astro`: 英文博客列表卡片。
- `ThemeProvider.astro`: 主题切换、系统主题同步和 toast。
- `TranslationNotice.astro`: 英文站点翻译进度提示。
- `WechatReveal.astro`: 微信号悬停/聚焦显示。
- `about/Substats.astro`: 关于页外部平台数据/粉丝数展示。
- `about/ToolSection.astro`: 关于页工具栈展示。
- `blog/FeatureCalloutCard.astro`: 博客内功能/重点卡片。
- `blog/TalkSlideFigure.astro`: 博客内嵌分享会 slide 图片。
- `comment/Comment.astro`: Waline 评论挂载。
- `comment/PageInfo.astro`: 页面浏览量/评论元信息。
- `comment/ViewCounter.astro`: 浏览量计数。
- `contact/ContactQR.astro`: 联系页二维码卡片。
- `home/LinkCard.astro`: 首页外链卡片。
- `home/ProjectCard.astro`: 首页项目卡片。
- `home/Section.astro`: 首页通用 section 容器。
- `home/SiteStats.astro`: 首页站点统计。
- `home/SkillLayout.astro`: 首页技能/工具布局。
- `intro/IntroOverlay.astro`: 首页开场动效/引导层。
- `links/FriendConstellation.astro`: 友链星座可视化。
- `links/FriendList.astro`: 友链列表。
- `mascot/JoJo.tsx` 和 `mascot/jojo.css`: 首页 mascot 交互组件。
- `navigation/BackToTop.astro`: 回到顶部按钮。
- `navigation/TableOfContents.astro`: 文章目录容器。
- `navigation/TableOfContentsItem.astro`: 文章目录项。
- `navigation/toc.ts`: Markdown headings 到 TOC 树的转换。
- `projects/GitHubContributions.astro`: GitHub contributions 展示。
- `projects/ProjectSection.astro`: 项目页分组 section。
- `projects/Sponsors.astro`: 赞助者列表。
- `projects/Sponsorship.astro`: 赞助入口。
- `search/SiteSearch.astro`: 站内搜索 UI（走 /api/search.json，中英文各自索引）。
- `terminal/*`: terminal dev mode、pseudo-FS、命令系统、文章 viewer 和样式。

## 部署

这个项目可以直接部署到 Vercel。默认配置见 `vercel.json` 和 `astro.config.ts`。

部署前请确认：

- 已替换站点域名、作者、头像和 favicon。
- 已替换或关闭 Waline 评论服务。
- 已确认 Analytics / Speed Insights 是否符合你的隐私和合规要求。
- 已清理示例文章、示例图片、二维码和个人联系方式。

## 许可

代码基于 Apache 2.0 协议开源。

文章、图片、PPT、二维码和个人内容不属于模板授权范围。fork 后请替换为你自己的内容。
