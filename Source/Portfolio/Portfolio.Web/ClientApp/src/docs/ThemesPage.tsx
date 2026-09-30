import { useTexts } from '@/i18n/hooks/useTexts'
import { DOCS_KEYS } from './Docs.keys'
import { FontFamily, FontSize, FontWeight, Label, LabelTone, Text, TextColor } from '@/design-system'

interface TokenGroup {
  title: string
  key?: keyof typeof DOCS_KEYS.themes.groups
  tokens: { name: string }[]
}

// Every theme file (all but the shared base and utilities) — the default one is the reference for the groups.
const themeSources = import.meta.glob<string>('@/design-system/theme/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const themes = Object.entries(themeSources)
  .map(([path, css]) => ({ name: path.split('/').pop()?.replace('.css', '') ?? '', css }))
  .filter((theme) => theme.name !== 'base' && theme.name !== 'utilities')
  .sort((a, b) => (a.name === 'dark' ? -1 : b.name === 'dark' ? 1 : a.name.localeCompare(b.name)))
const darkCss = themes.find((theme) => theme.name === 'dark')?.css ?? ''

const valuesOf = (css: string) =>
  new Map([...css.matchAll(/^\s*--color-([\w-]+):\s*(.+?);/gm)].map((m) => [m[1] ?? '', (m[2] ?? '').trim()]))
const themeValues = themes.map((theme) => ({ name: theme.name, values: valuesOf(theme.css) }))

// Key of each group's title, by the comment above the group in dark.css (unknown ones keep their own title).
const GROUP_KEYS: Record<string, keyof typeof DOCS_KEYS.themes.groups> = {
  'Surfaces (backgrounds)': 'surfaces',
  'Lines (borders and separators)': 'lines',
  'Content (text and icons)': 'content',
  Accent: 'accent',
  Links: 'links',
  'Tones: success, warning, danger, info': 'tones',
  'Decoration and file types': 'decoration',
  'Translucent overlays: tint = hover wash, highlight = light edge, scrim = shadows': 'overlays',
}

// The default theme file is the reference: groups come from its comments, tokens from its declarations.
function parseGroups(css: string): TokenGroup[] {
  const groups: TokenGroup[] = []
  for (const line of css.split('\n')) {
    const title = line.match(/^\s*\/\*\s*(.+?)\s*\*\/\s*$/)
    if (title && !line.includes('--'))
      groups.push({ title: title[1] ?? '', key: GROUP_KEYS[title[1] ?? ''], tokens: [] })
    const token = line.match(/^\s*--color-([\w-]+):\s*(.+?);/)
    if (token) groups[groups.length - 1]?.tokens.push({ name: token[1] ?? '' })
  }
  return groups.filter((g) => g.tokens.length)
}

const groups = parseGroups(darkCss)

const STEPS = ['copy', 'register', 'check', 'use'] as const
const RULES = ['raw', 'alpha', 'read', 'attribute'] as const

export function ThemesPage() {
  const [text, t] = useTexts(DOCS_KEYS, 'docs')
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <Label tone={LabelTone.Accent}>{text.themes.kicker}</Label>
        <Text
          as="h1"
          size={FontSize.Display}
          weight={FontWeight.Medium}
          color={TextColor.Heading}
          className="max-w-[720px] leading-[1.1] tracking-[-.02em]"
        >
          {text.themes.title}
        </Text>
        <Text size={FontSize.Large} color={TextColor.Body} className="max-w-[720px] leading-[1.6]">
          {t(DOCS_KEYS.themes.text, { count: groups.length })}
        </Text>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <Text as="h2" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
            {group.key ? text.themes.groups[group.key] : group.title}
          </Text>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
            {group.tokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center gap-3 rounded-lg border border-line-subtle bg-surface-card px-3 py-2"
              >
                <span
                  aria-hidden
                  className="size-6 shrink-0 rounded-sm border border-line-strongest"
                  style={{ background: `var(--color-${token.name})` }}
                />
                <span className="flex min-w-0 flex-col">
                  <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Primary} className="truncate">
                    {token.name}
                  </Text>
                  <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint} className="truncate">
                    {themeValues.map((theme) => `${theme.name} ${theme.values.get(token.name) ?? '—'}`).join(' · ')}
                  </Text>
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-3">
        <Text as="h2" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          {text.themes.howTo.title}
        </Text>
        <ol className="flex max-w-[760px] list-decimal flex-col gap-2 pl-5 marker:text-content-muted">
          {STEPS.map((step) => (
            <li key={step}>
              <Text size={FontSize.Medium} color={TextColor.Body} className="leading-[1.6]">
                {text.themes.howTo.steps[step]}
              </Text>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <Text as="h2" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          {text.themes.rules.title}
        </Text>
        <ul className="flex max-w-[760px] list-disc flex-col gap-2 pl-5 marker:text-content-muted">
          {RULES.map((rule) => (
            <li key={rule}>
              <Text size={FontSize.Medium} color={TextColor.Body} className="leading-[1.6]">
                {text.themes.rules.items[rule]}
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
