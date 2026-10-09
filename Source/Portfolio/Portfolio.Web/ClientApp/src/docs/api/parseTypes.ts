// Vite includes the design system's `*.types.ts` sources as raw text. When this module runs,
// it parses interfaces, aliases, const-object enums and JSDoc into data for the API tables.
// The types files are the single source of truth, so the docs can't drift from the code.

export interface PropDoc {
  name: string
  type: string
  optional: boolean
  description: string
  defaultValue?: string
}

export interface InterfaceDoc {
  name: string
  /** Extended types this parser could not resolve locally (e.g. `Omit<ButtonHTMLAttributes<...>, '...'>`). */
  extends?: string
  description: string
  props: PropDoc[]
}

export interface AliasDoc {
  name: string
  type: string
  description: string
}

export interface EnumMemberDoc {
  key: string
  value: string
  description: string
}

export interface EnumDoc {
  name: string
  members: EnumMemberDoc[]
}

const sources = import.meta.glob('@/design-system/{components,internal}/**/*.types.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** An interface as written, before resolving its `extends` against other locally parsed interfaces. */
interface RawInterface {
  name: string
  /** Comma-split `extends` parts, e.g. `['ButtonSharedProps', "Omit<ButtonHTMLAttributes<...>, 'color'>"]`. */
  rawExtends: string[]
  description: string
  props: PropDoc[]
}

const rawInterfaces = new Map<string, RawInterface>()
const interfaces = new Map<string, InterfaceDoc>()
const aliases = new Map<string, AliasDoc>()
const enums = new Map<string, EnumDoc>()

interface Doc {
  description: string
  defaultValue?: string
}

function readDoc(block: string[]): Doc {
  const cleaned = block
    .join('\n')
    .replace(/^\s*\/\*\*/, '')
    .replace(/\*\/\s*$/, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
  let defaultValue: string | undefined
  const text: string[] = []
  for (const line of cleaned) {
    const m = line.match(/^@default\s+(.+)$/)
    if (m) defaultValue = m[1]
    else text.push(line)
  }
  return { description: text.join(' '), defaultValue }
}

/**
 * Reads a JSDoc block starting at line `start` (already known to begin with `/**`) up to its closing line,
 * bounded by EOF — a source truncated or edited mid-comment stops at the last line instead of scanning forever.
 */
function readCommentBlock(lineAt: (index: number) => string, lastIndex: number, start: number) {
  const block = [lineAt(start)]
  let i = start
  while (!lineAt(i).includes('*/') && i < lastIndex) {
    i++
    block.push(lineAt(i))
  }
  return { block, end: i }
}

/** Splits `text` on top-level occurrences of `separator` — ignores ones inside `<>`, `()`, `[]`, `{}`. */
function splitTopLevel(text: string, separator: string): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '<' || c === '(' || c === '[' || c === '{') depth++
    else if (c === '>' || c === ')' || c === ']' || c === '}') depth--
    else if (depth === 0 && text[i] === separator) {
      parts.push(text.slice(start, i))
      start = i + 1
    }
  }
  parts.push(text.slice(start))
  return parts.map((p) => p.trim()).filter(Boolean)
}

function parse(src: string) {
  const lines = src.split(/\r?\n/)
  const lineAt = (index: number) => lines[index] ?? ''
  let pending: Doc | null = null
  const take = () => {
    const doc = pending
    pending = null
    return doc
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lineAt(i)
    const trimmed = line.trim()

    if (trimmed.startsWith('/**')) {
      const { block, end } = readCommentBlock(lineAt, lines.length - 1, i)
      i = end
      pending = readDoc(block)
      continue
    }

    const enumMatch = line.match(/^export const (\w+) = \{\s*$/)
    if (enumMatch) {
      pending = null
      const members: EnumMemberDoc[] = []
      let memberDoc: Doc | null = null
      for (i++; !lineAt(i).startsWith('}') && i < lines.length; i++) {
        const l = lineAt(i)
        if (l.trim().startsWith('/**')) {
          const { block, end } = readCommentBlock(lineAt, lines.length - 1, i)
          i = end
          memberDoc = readDoc(block)
          continue
        }
        const m = l.match(/^\s+(\w+):\s*'([^']*)'/)
        if (m) {
          members.push({ key: m[1] ?? '', value: m[2] ?? '', description: memberDoc?.description ?? '' })
          memberDoc = null
        }
      }
      const [, enumName = ''] = enumMatch
      enums.set(enumName, { name: enumName, members })
      continue
    }

    // Interface header, exported or not (a local, unexported interface is how props shared between the
    // variants of a union — e.g. Button's `ButtonSharedProps` — are written) — and possibly spanning several
    // lines, since Prettier wraps a long `extends` clause onto its own line.
    if (/^(?:export )?interface \w+/.test(line)) {
      const doc = take()
      let header = line
      let guard = 0
      while (!header.includes('{') && guard < 40 && i < lines.length - 1) {
        i++
        header += ` ${lineAt(i).trim()}`
        guard++
      }
      if (!header.includes('{')) {
        // Malformed or truncated input — skip rather than scan the rest of the file as if inside this body.
        continue
      }
      const headerBody = header.slice(0, header.indexOf('{')).trim()
      const headerMatch = headerBody.match(/^(?:export )?interface (\w+)(?:<[^>]*>)?(?: extends (.+))?$/)
      if (!headerMatch) continue
      const [, ifaceName = '', extendsClause] = headerMatch

      const props: PropDoc[] = []
      let propDoc: Doc | null = null
      for (i++; !lineAt(i).startsWith('}') && i < lines.length; i++) {
        const l = lineAt(i)
        if (l.trim().startsWith('/**')) {
          const { block, end } = readCommentBlock(lineAt, lines.length - 1, i)
          i = end
          propDoc = readDoc(block)
          continue
        }
        const m = l.match(/^ {2}('?[\w-]+'?)(\?)?:\s*(.+?);?\s*$/)
        if (m) {
          props.push({
            name: (m[1] ?? '').replace(/'/g, ''),
            optional: !!m[2],
            type: m[3] ?? '',
            description: propDoc?.description ?? '',
            defaultValue: propDoc?.defaultValue,
          })
          propDoc = null
        }
      }
      rawInterfaces.set(ifaceName, {
        name: ifaceName,
        rawExtends: extendsClause ? splitTopLevel(extendsClause, ',') : [],
        description: doc?.description ?? '',
        props,
      })
      continue
    }

    const aliasMatch = line.match(/^export type (\w+) =(.*)$/)
    if (aliasMatch) {
      const doc = take()
      const [, aliasName = '', aliasRhs = ''] = aliasMatch
      const rhs = aliasRhs.trim()
      if (/^\(?typeof \w+\)?\[keyof typeof \w+\]$/.test(rhs)) continue
      const parts = [rhs]
      while (
        lineAt(i + 1)
          .trim()
          .startsWith('|')
      )
        parts.push(lineAt(++i).trim())
      aliases.set(aliasName, {
        name: aliasName,
        type: parts.join(' ').trim(),
        description: doc?.description ?? '',
      })
      continue
    }

    pending = null
  }
}

Object.values(sources).forEach(parse)

/** Exposed only for resilience tests (malformed/truncated input) — parses `src` into the module-level maps
 * the same way the real sources above are parsed; not meant to be called from application code. */
export const parseSource = parse

/**
 * Resolves an interface's `extends` against other locally parsed interfaces (e.g. a union variant like
 * `ButtonAsButtonProps` against the shared `ButtonSharedProps` it and its sibling variant both extend):
 * a resolvable part's props are merged in; an unresolvable one (a DOM `HTMLAttributes`/`Omit<...>`) is kept
 * as text for the "also accepts every prop of …" line. `visiting` guards against an extends cycle.
 */
function resolveInterface(name: string, visiting: Set<string> = new Set()): InterfaceDoc | undefined {
  const cached = interfaces.get(name)
  if (cached) return cached
  const raw = rawInterfaces.get(name)
  if (!raw) return undefined
  if (visiting.has(name)) return { name: raw.name, description: raw.description, props: raw.props }
  visiting.add(name)

  const inheritedProps: PropDoc[] = []
  const foreignExtends: string[] = []
  for (const part of raw.rawExtends) {
    const bareName = /^\w+$/.test(part) ? part : null
    const resolved = bareName ? resolveInterface(bareName, visiting) : undefined
    if (resolved) inheritedProps.push(...resolved.props)
    else foreignExtends.push(part)
  }

  const doc: InterfaceDoc = {
    name: raw.name,
    extends: foreignExtends.length ? foreignExtends.join(', ') : undefined,
    description: raw.description,
    props: [...inheritedProps, ...raw.props],
  }
  interfaces.set(name, doc)
  return doc
}

for (const name of rawInterfaces.keys()) resolveInterface(name)

export const getInterface = (name: string) => interfaces.get(name)
export const getAlias = (name: string) => aliases.get(name)
export const getEnum = (name: string) => enums.get(name)

/**
 * A union alias (e.g. `type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps`) whose every member is a
 * known interface — the variants of a component with more than one valid HTML shape (a link vs a button).
 * `undefined` for anything else, including a union that isn't purely of local interfaces.
 */
export function getUnion(name: string): InterfaceDoc[] | undefined {
  const alias = aliases.get(name)
  if (!alias) return undefined
  const parts = alias.type
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length < 2) return undefined
  const resolved = parts.map((p) => interfaces.get(p))
  return resolved.every((r): r is InterfaceDoc => !!r) ? resolved : undefined
}
