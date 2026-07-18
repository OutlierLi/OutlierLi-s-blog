export type Level = 0 | 1 | 2 | 3 | 4
export type Contribution = { date: string; count: number; level: Level }
export type ContributionsResponse = {
  total: { lastYear: number } & Record<string, number>
  contributions: Contribution[]
}

const USER_AGENT = 'outlierli-s-blog.pages.dev'

export async function fetchPublicContributions(username: string): Promise<ContributionsResponse> {
  const html = await fetchContributionHtml(username)
  const contributions = parseContributions(html)

  return {
    total: { lastYear: parseTotal(html, contributions) },
    contributions
  }
}

async function fetchContributionHtml(username: string) {
  const url = `https://github.com/users/${encodeURIComponent(username)}/contributions`

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'text/html',
        'User-Agent': USER_AGENT
      }
    })

    if (!res.ok) {
      throw new Error(`github contributions ${res.status}`)
    }

    return await res.text()
  } catch (err) {
    if (!import.meta.env.DEV) throw err
    return await fetchContributionHtmlWithCurl(url)
  }
}

async function fetchContributionHtmlWithCurl(url: string) {
  const [{ execFile }, { promisify }] = await Promise.all([
    import('node:child_process'),
    import('node:util')
  ])
  const execFileAsync = promisify(execFile)
  const { stdout } = await execFileAsync(
    'curl',
    ['-L', '-sS', '--max-time', '20', '-H', `User-Agent: ${USER_AGENT}`, url],
    { maxBuffer: 1024 * 1024 }
  )
  return stdout
}

export function parseContributions(html: string): Contribution[] {
  const tooltipCounts = new Map<string, number>()
  const tooltipPattern = /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g
  for (const match of html.matchAll(tooltipPattern)) {
    const [, id, label] = match
    const text = stripTags(label).trim()
    const count = text.startsWith('No contributions') ? 0 : Number(text.match(/\d+/)?.[0] ?? 0)
    tooltipCounts.set(id, count)
  }

  const contributions: Contribution[] = []
  const dayPattern = /<td\b[^>]*ContributionCalendar-day[^>]*>/g
  for (const match of html.matchAll(dayPattern)) {
    const tag = match[0]
    const id = attr(tag, 'id')
    const date = attr(tag, 'data-date')
    const rawLevel = Number(attr(tag, 'data-level') ?? 0)
    if (!id || !date) continue

    contributions.push({
      date,
      count: tooltipCounts.get(id) ?? 0,
      level: clampLevel(rawLevel)
    })
  }

  return contributions.sort((a, b) => a.date.localeCompare(b.date))
}

function parseTotal(html: string, contributions: Contribution[]) {
  const totalMatch = html.match(
    /id="js-contribution-activity-description"[\s\S]*?([\d,]+)\s+contributions/
  )
  if (totalMatch) return Number(totalMatch[1].replace(/,/g, ''))
  return contributions.reduce((sum, day) => sum + day.count, 0)
}

function attr(tag: string, name: string) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
}

function clampLevel(level: number): Level {
  if (level <= 0) return 0
  if (level >= 4) return 4
  return level as Level
}

function stripTags(value: string) {
  return value.replace(/<[^>]+>/g, '')
}
