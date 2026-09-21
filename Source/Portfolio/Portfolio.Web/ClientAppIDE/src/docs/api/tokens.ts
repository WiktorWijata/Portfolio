// Works out which design tokens a component uses by scanning the source of its files
// (Tailwind utilities such as `bg-list`, `text-xs`, `rounded-md`, `var(--color-x)`, and the
// `FontSize`/`TextColor`/... props resolved through Text's own class maps) against the
// `@theme` block in index.css. Nothing here is written by hand, so it can't go stale.
import themeCss from '@/index.css?raw'

export type TokenCategory = 'colors' | 'sizes' | 'fonts' | 'radii' | 'shadows' | 'breakpoints'

export const tokenCategoryLabels: Record<TokenCategory, string> = {
  colors: 'Kolory',
  sizes: 'Rozmiary czcionek',
  fonts: 'Fonty',
  radii: 'Zaokrąglenia',
  shadows: 'Cienie',
  breakpoints: 'Breakpointy',
}

export interface TokenUsage {
  /** CSS variable, e.g. `--color-list`. */
  token: string
  category: TokenCategory
  value: string
  /** What the token is used for, e.g. "tło", "obramowanie". */
  roles: string[]
  /** Example utilities/props that reference it. */
  classes: string[]
}

export interface ComponentTokens {
  groups: { category: TokenCategory; label: string; tokens: TokenUsage[] }[]
  /** Other design-system components this one is built from. */
  dependencies: string[]
}

const sources = import.meta.glob('@/design-system/components/*/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const theme = new Map<string, string>()
const themeBlock = themeCss.match(/@theme\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
for (const m of themeBlock.matchAll(/^\s*(--[\w-]+):\s*(.+?);/gm)) theme.set(m[1] ?? '', (m[2] ?? '').trim())

const categoryOf = (token: string): TokenCategory | null => {
  if (token.startsWith('--color-')) return 'colors'
  if (token.startsWith('--text-') && !token.includes('--line-height')) return 'sizes'
  if (token.startsWith('--font-')) return 'fonts'
  if (token.startsWith('--radius-')) return 'radii'
  if (token.startsWith('--shadow-')) return 'shadows'
  if (token.startsWith('--breakpoint-')) return 'breakpoints'
  return null
}

const colorRoles: Record<string, string> = {
  bg: 'tło',
  text: 'kolor tekstu',
  border: 'obramowanie',
  outline: 'obrys',
  ring: 'obrys',
  fill: 'wypełnienie',
  stroke: 'kreska',
  caret: 'kursor',
  divide: 'separator',
  from: 'gradient',
  to: 'gradient',
  via: 'gradient',
}

const colorPrefix = /^(bg|text|border-[trblxyse]|border|outline|ring|fill|stroke|caret|divide|from|to|via)-(.+)$/

// Text's own maps: `[FontSize.Nano]: 'text-3xs'` → lets FontSize.Nano resolve to the class it produces.
const enumClasses = new Map<string, string>()
for (const [path, src] of Object.entries(sources)) {
  if (!path.endsWith('/Text/Text.tsx')) continue
  for (const m of src.matchAll(/\[(\w+\.\w+)\]:\s*'([^']+)'/g)) enumClasses.set(m[1] ?? '', m[2] ?? '')
}

function splitVariants(raw: string) {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i]
    if (c === '[' || c === '(') depth++
    else if (c === ']' || c === ')') depth--
    else if (c === ':' && depth === 0) {
      parts.push(raw.slice(start, i))
      start = i + 1
    }
  }
  parts.push(raw.slice(start))
  return { variants: parts.slice(0, -1), base: parts[parts.length - 1] }
}

function stripOpacity(base: string) {
  let depth = 0
  for (let i = 0; i < base.length; i++) {
    const c = base[i]
    if (c === '[' || c === '(') depth++
    else if (c === ']' || c === ')') depth--
    else if (c === '/' && depth === 0) return base.slice(0, i)
  }
  return base
}

type Add = (token: string, role: string, via: string) => void

function readClass(raw: string, add: Add, via = raw) {
  const { variants, base: rawBase = '' } = splitVariants(raw)
  for (const v of variants) {
    const bp = v.match(/^(?:max-)?(bp\d+)$/)
    if (bp && theme.has(`--breakpoint-${bp[1]}`)) add(`--breakpoint-${bp[1]}`, 'zmiana układu', v)
  }
  const base = stripOpacity(rawBase.replace(/^[!-]/, ''))

  const color = base.match(colorPrefix)
  if (color) {
    const name = color[2] ?? ''
    if (color[1] === 'text' && theme.has(`--text-${name}`)) {
      add(`--text-${name}`, 'rozmiar czcionki', via)
      return
    }
    if (theme.has(`--color-${name}`)) {
      const role =
        variants.includes('placeholder') && color[1] === 'text'
          ? 'kolor placeholdera'
          : (colorRoles[(color[1] ?? '').replace(/-[trblxyse]$/, '')] ?? 'kolor')
      add(`--color-${name}`, role, via)
      return
    }
  }
  const radius = base.match(/^rounded(?:-[trblse]{1,2})?-(.+)$/)
  if (radius && theme.has(`--radius-${radius[1]}`)) return add(`--radius-${radius[1]}`, 'zaokrąglenie', via)
  const shadow = base.match(/^shadow-(.+)$/)
  if (shadow && theme.has(`--shadow-${shadow[1]}`)) return add(`--shadow-${shadow[1]}`, 'cień', via)
  const font = base.match(/^font-(sans|mono|tree)$/)
  if (font && theme.has(`--font-${font[1]}`)) return add(`--font-${font[1]}`, 'font', via)
}

const cache = new Map<string, ComponentTokens>()

export function getComponentTokens(folder: string): ComponentTokens {
  const cached = cache.get(folder)
  if (cached) return cached

  const found = new Map<string, { roles: Set<string>; classes: Set<string> }>()
  const add: Add = (token, role, via) => {
    const entry = found.get(token) ?? { roles: new Set(), classes: new Set() }
    entry.roles.add(role)
    entry.classes.add(via)
    found.set(token, entry)
  }
  const dependencies = new Set<string>()

  for (const [path, rawSrc] of Object.entries(sources)) {
    if (!path.includes(`/components/${folder}/`)) continue
    const src = rawSrc.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

    for (const raw of src.split(/[\s'"`{}]+/)) if (raw) readClass(raw, add)
    for (const m of src.matchAll(/var\((--[\w-]+)/g))
      if (theme.has(m[1] ?? '')) add(m[1] ?? '', 'wartość arbitralna', `var(${m[1]})`)
    for (const m of src.matchAll(/from '\.\.\/(\w+)'/g)) dependencies.add(m[1] ?? '')

    if (!path.endsWith('/Text/Text.tsx')) {
      for (const m of src.matchAll(/\b(FontSize|TextColor|FontFamily|FontWeight)\.(\w+)/g)) {
        const cls = enumClasses.get(`${m[1]}.${m[2]}`)
        if (cls) readClass(cls, add, `${m[1]}.${m[2]}`)
      }
    }
  }

  const groups = (Object.keys(tokenCategoryLabels) as TokenCategory[])
    .map((category) => ({
      category,
      label: tokenCategoryLabels[category],
      tokens: [...found.entries()]
        .filter(([token]) => categoryOf(token) === category)
        .map(([token, e]) => ({
          token,
          category,
          value: theme.get(token) ?? '',
          roles: [...e.roles],
          classes: [...e.classes].slice(0, 4),
        }))
        .sort((a, b) => a.token.localeCompare(b.token)),
    }))
    .filter((g) => g.tokens.length)

  const result = { groups, dependencies: [...dependencies].filter((d) => d !== folder) }
  cache.set(folder, result)
  return result
}
