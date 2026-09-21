// Reads the design system's `*.types.ts` files (as raw text, at build time) and turns
// interfaces, aliases and const-object enums plus their JSDoc into data for the API tables.
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

const sources = import.meta.glob('@/design-system/components/*/*.types.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

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
      const block = [line]
      while (!lineAt(i).includes('*/')) block.push(lineAt(++i))
      pending = readDoc(block)
      continue
    }

    const enumMatch = line.match(/^export const (\w+) = \{\s*$/)
    if (enumMatch) {
      pending = null
      const members: EnumMemberDoc[] = []
      let memberDoc: Doc | null = null
      for (i++; !lineAt(i).startsWith('}'); i++) {
        const l = lineAt(i)
        if (l.trim().startsWith('/**')) {
          const block = [l]
          while (!lineAt(i).includes('*/')) block.push(lineAt(++i))
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

    const ifaceMatch = line.match(/^export interface (\w+)(?:<[^>]*>)?(?: extends (.+?))? \{\s*$/)
    if (ifaceMatch) {
      const doc = take()
      const props: PropDoc[] = []
      let propDoc: Doc | null = null
      for (i++; !lineAt(i).startsWith('}'); i++) {
        const l = lineAt(i)
        if (l.trim().startsWith('/**')) {
          const block = [l]
          while (!lineAt(i).includes('*/')) block.push(lineAt(++i))
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
      const [, ifaceName = ''] = ifaceMatch
      interfaces.set(ifaceName, {
        name: ifaceName,
        extends: ifaceMatch[2],
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

export const getInterface = (name: string) => interfaces.get(name)
export const getAlias = (name: string) => aliases.get(name)
export const getEnum = (name: string) => enums.get(name)
