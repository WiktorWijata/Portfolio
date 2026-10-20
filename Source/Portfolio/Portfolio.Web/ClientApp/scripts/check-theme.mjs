// Verifies the theme contract (`npm run check:theme`, also part of `npm run lint`):
//  1. every theme file defines exactly the same `--color-*` tokens as the default theme (dark.css),
//  2. no raw colour values sit in CSS outside the theme files,
//  3. every colour token that code refers to (utilities such as `bg-surface-card`, `var(--color-x)`) exists.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../src', import.meta.url))
const themeDir = join(root, 'design-system', 'theme')
const NOT_THEMES = new Set(['base.css', 'utilities.css'])
const DEFAULT_THEME = 'dark.css'

const read = (path) => readFileSync(path, 'utf8')
// theme-dependent variables: the colours and the few `--theme-*` switches
const tokensOf = (css) => new Set([...css.matchAll(/^\s*--((?:color|theme)-[\w-]+):/gm)].map((m) => m[1]))

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const problems = []
const themeFiles = readdirSync(themeDir).filter((f) => f.endsWith('.css') && !NOT_THEMES.has(f))
const reference = tokensOf(read(join(themeDir, DEFAULT_THEME)))

// 1. contract
for (const file of themeFiles) {
  if (file === DEFAULT_THEME) continue
  const tokens = tokensOf(read(join(themeDir, file)))
  const missing = [...reference].filter((t) => !tokens.has(t))
  const extra = [...tokens].filter((t) => !reference.has(t))
  if (missing.length) problems.push(`${file}: missing tokens: ${missing.join(', ')}`)
  if (extra.length) problems.push(`${file}: tokens not in ${DEFAULT_THEME}: ${extra.join(', ')}`)
}

// 2. raw colours in CSS outside the theme files
const rawColour = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/
for (const file of walk(root).filter((f) => f.endsWith('.css'))) {
  const name = file.slice(themeDir.length + 1)
  if (file.startsWith(themeDir) && themeFiles.includes(name)) continue
  const css = read(file).replace(/\/\*[\s\S]*?\*\//g, '')
  if (rawColour.test(css)) problems.push(`${relative(root, file)}: raw colour value outside the theme files`)
}

// 3. references in code
const groups = 'surface|line|content|accent|link|success|warning|danger|info|decor|filetype|indicator|chat|tint|scrim'
const utility = new RegExp(
  String.raw`(?<![\w-])(?:[\w@\[\]\-:&>*.]+:)*(?:text|bg|border|border-[trblxyse]|from|via|to|outline|ring|fill|stroke|caret|divide|decoration|placeholder)-((?:${groups})(?:-[a-z0-9]+)*)(?:/(?:\[[\d.]+\]|\d+))?(?![\w\[-])`,
  'g',
)
// utilities defined in utilities.css are not tokens
const utilities = new Set(
  [...read(join(themeDir, 'utilities.css')).matchAll(/@utility\s+(?:bg|text|border)-([\w-]+)/g)].map((m) => m[1]),
)
const varRef = /var\(--color-([\w-]+)\)/g
for (const file of walk(root).filter((f) => /\.(ts|tsx|css)$/.test(f))) {
  const rel = relative(root, file)
  if (
    rel.endsWith('changelog.ts') ||
    (file.startsWith(themeDir) && themeFiles.includes(file.slice(themeDir.length + 1)))
  )
    continue
  const src = read(file)
  const unknown = new Set()
  for (const m of src.matchAll(utility)) if (!reference.has(`color-${m[1]}`) && !utilities.has(m[1])) unknown.add(m[1])
  if (!rel.startsWith('docs'))
    for (const m of src.matchAll(varRef)) if (!reference.has(`color-${m[1]}`)) unknown.add(m[1])
  if (unknown.size) problems.push(`${rel}: unknown colour tokens: ${[...unknown].join(', ')}`)
}

if (problems.length) {
  console.error(problems.map((p) => `✖ ${p}`).join('\n'))
  process.exit(1)
}
console.log(`Theme OK: ${themeFiles.length} theme file(s), ${reference.size} theme variables.`)
