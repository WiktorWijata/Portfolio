// Works out which design tokens a component uses by scanning the source of its files
// (Tailwind utilities such as `bg-surface-panel`, `text-xs`, `rounded-md`, `var(--color-x)`, and the
// `FontSize`/`TextColor`/... props resolved through Text's own class maps) against the
// `@theme` blocks of the theme files (design-system/theme). Nothing here is written by hand, so it can't go stale.

export type TokenCategory = 'colors' | 'sizes' | 'fonts' | 'radii' | 'shadows' | 'breakpoints'

export const tokenCategoryLabels: Record<TokenCategory, string> = {
  colors: 'Kolory',
  sizes: 'Rozmiary czcionek',
  fonts: 'Fonty',
  radii: 'Zaokrąglenia',
  shadows: 'Cienie',
  breakpoints: 'Breakpointy',
}

const cssFiles = import.meta.glob<string>('@/design-system/theme/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const cssByName = new Map(
  Object.entries(cssFiles).map(([path, css]) => [path.split('/').pop()?.replace('.css', '') ?? '', css]),
)
const baseCss = cssByName.get('base') ?? ''
const darkCss = cssByName.get('dark') ?? ''

/** Bodies of the `@utility name { ... }` blocks in `utilities.css`, keyed by name (braces balanced, not regex-greedy). */
function extractUtilityBodies(css: string): Map<string, string> {
  const bodies = new Map<string, string>()
  const start = /@utility\s+([\w-]+)\s*\{/g
  for (let m = start.exec(css); m; m = start.exec(css)) {
    const name = m[1] ?? ''
    let depth = 1
    let i = start.lastIndex
    const bodyStart = i
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++
      else if (css[i] === '}') depth--
      i++
    }
    bodies.set(name, css.slice(bodyStart, i - 1))
    start.lastIndex = i
  }
  return bodies
}
const utilityBodies = extractUtilityBodies(cssByName.get('utilities') ?? '')
/** Names of the themes, the default one first (the shared base and utilities are not themes). */
export const themeNames = [...cssByName.keys()]
  .filter((name) => name !== 'base' && name !== 'utilities')
  .sort((a, b) => (a === 'dark' ? -1 : b === 'dark' ? 1 : a.localeCompare(b)))

/** Value of a token in one theme (`undefined` when the theme does not override it). */
function valueIn(themeName: string, token: string): string | undefined {
  const css = cssByName.get(themeName) ?? ''
  const match = css.match(new RegExp(String.raw`^\s*${token}:\s*([^;]+);`, 'm'))
  return match?.[1]?.replace(/\s+/g, ' ').trim()
}

export interface TokenUsage {
  /** CSS variable, e.g. `--color-surface-panel`. */
  token: string
  category: TokenCategory
  value: string
  /** The value in every theme (the default theme's value stands in where a theme does not override it). */
  themeValues: { theme: string; value: string }[]
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

// Both `components/` (public) and `internal/` (shared, unexported building blocks like `Field`), and both
// extensions: a component's classes can live one import away, e.g. Input/Textarea's shared field styles.
// Tests are not component implementations and must not enter the docs bundle or token scan.
const sources = import.meta.glob(
  [
    '@/design-system/{components,internal}/**/*.{ts,tsx}',
    '!@/design-system/**/*.{test,spec}.{ts,tsx}',
    '!@/design-system/**/__tests__/**',
  ],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
) as Record<string, string>

const theme = new Map<string, string>()
for (const css of [baseCss, darkCss]) {
  for (const block of css.matchAll(/@theme[^{]*\{([\s\S]*?)\n\}/g)) {
    // A value may run over several lines (Prettier wraps long shadows), so it is read up to the semicolon.
    for (const m of (block[1] ?? '').matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm))
      theme.set(m[1] ?? '', (m[2] ?? '').replace(/\s+/g, ' ').trim())
  }
}

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
  if (!path.endsWith('/Text/Text.consts.ts')) continue
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

  // A custom `@utility` (e.g. `focus-ring`) has no Tailwind prefix of its own — resolve the tokens its
  // CSS body references instead of trying to match it against the prefix patterns below.
  const utilityBody = utilityBodies.get(base)
  if (utilityBody !== undefined) {
    for (const m of utilityBody.matchAll(/var\((--[\w-]+)/g)) if (theme.has(m[1] ?? '')) add(m[1] ?? '', 'kolor', via)
    return
  }

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

/** Resolves a relative import specifier written in `fromPath` to whichever key of `sources` it names (the
 * file itself, or its `index.ts(x)` for a directory import like `'../Text'` → `components/Text/index.ts`). */
function resolveModule(fromPath: string, spec: string): string | undefined {
  if (!spec.startsWith('.')) return undefined
  const resolved = fromPath.split('/').slice(0, -1)
  for (const seg of spec.split('/')) {
    if (seg === '' || seg === '.') continue
    if (seg === '..') resolved.pop()
    else resolved.push(seg)
  }
  const base = resolved.join('/')
  return [`${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`].find((c) => c in sources)
}

/**
 * A component's own files plus every local module they (transitively) import — so a style pulled out into a
 * shared file, like Input/Textarea's `internal/Field`, is still counted as the component's own. Cycle-safe.
 */
function reachableFiles(folder: string): string[] {
  const roots = Object.keys(sources).filter((p) => p.includes(`/components/${folder}/`))
  const visited = new Set(roots)
  const queue = [...roots]
  for (let current = queue.shift(); current; current = queue.shift()) {
    for (const m of (sources[current] ?? '').matchAll(/from '([^']+)'/g)) {
      const resolved = resolveModule(current, m[1] ?? '')
      if (resolved && !visited.has(resolved)) {
        visited.add(resolved)
        queue.push(resolved)
      }
    }
  }
  return [...visited]
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

  for (const path of reachableFiles(folder)) {
    const rawSrc = sources[path] ?? ''
    const src = rawSrc.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
    const isText = path.endsWith('/Text/Text.consts.ts')

    // Text.consts.ts is a dispatch table (every FontSize/TextColor/… class, for every variant it can
    // render), not a component's own styling — scanning it whole would credit a dependant with every variant
    // Text *could* produce, not the ones it actually selects. Skip its maps here unless Text is the folder being
    // looked up (its own docs page does want its full capability listed); a dependant's real usage still
    // comes through below, resolved from the specific `FontSize.X` etc. it references.
    if (!isText || folder === 'Text') {
      for (const raw of src.split(/[\s'"`{}]+/)) if (raw) readClass(raw, add)
    }
    for (const m of src.matchAll(/var\((--[\w-]+)/g))
      if (theme.has(m[1] ?? '')) add(m[1] ?? '', 'wartość arbitralna', `var(${m[1]})`)
    for (const m of src.matchAll(/from '([^']+)'/g)) {
      const dep = resolveModule(path, m[1] ?? '')?.match(/\/components\/(\w+)\//)
      if (dep) dependencies.add(dep[1] ?? '')
    }

    if (!isText) {
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
          themeValues: themeNames.map((name) => ({
            theme: name,
            value: valueIn(name, token) ?? theme.get(token) ?? '',
          })),
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
