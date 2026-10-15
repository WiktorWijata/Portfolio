import type { ReactNode } from 'react'

const LINK_CLASS = 'text-accent-light underline underline-offset-2 hover:text-accent'
const CODE_CLASS = 'rounded bg-surface-editor px-1 py-px font-mono text-[0.92em]'

/** Only these may be linked: the text comes from a model, so a `javascript:` link must never become a link. */
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:'])

// One alternative per kind of inline markup; the first that matches at a position wins.
const INLINE =
  /(\*\*[^*\n]+\*\*|__[^_\n]+__|`[^`\n]+`|\*[^*\s][^*\n]*\*|\[[^\]\n]+\]\([^)\s]+\)|https?:\/\/[^\s<>()]+)/g
const BULLET = /^\s*[-*+]\s+(.*)$/
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/
const HEADING = /^#{1,6}\s+(.*)$/
const TRAILING_PUNCTUATION = /[.,;:!?]+$/

function safeUrl(url: string): string | null {
  try {
    return SAFE_PROTOCOLS.has(new URL(url).protocol) ? url : null
  } catch {
    return null
  }
}

function link(url: string, label: string, key: number): ReactNode {
  const href = safeUrl(url)
  if (!href) return label

  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {label}
    </a>
  )
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0

  for (const match of text.matchAll(INLINE)) {
    const token = match[0]
    const start = match.index
    if (start > last) nodes.push(text.slice(last, start))

    const key = start
    if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      nodes.push(
        <code key={key} className={CODE_CLASS}>
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('[')) {
      const split = token.indexOf('](')
      nodes.push(link(token.slice(split + 2, -1), token.slice(1, split), key))
    } else {
      // A bare address: the punctuation that ends a sentence is not part of it.
      const trailing = TRAILING_PUNCTUATION.exec(token)?.[0] ?? ''
      const url = trailing ? token.slice(0, -trailing.length) : token
      nodes.push(link(url, url, key))
      if (trailing) nodes.push(trailing)
    }

    last = start + token.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

type Block = { kind: 'p'; lines: string[] } | { kind: 'ul' | 'ol'; items: string[] }

function toBlocks(source: string): Block[] {
  const blocks: Block[] = []

  for (const line of source.replace(/\r\n?/g, '\n').split('\n')) {
    const bullet = BULLET.exec(line)
    const numbered = NUMBERED.exec(line)
    const heading = HEADING.exec(line)
    const last = blocks.at(-1)

    if (bullet || numbered) {
      const kind = bullet ? 'ul' : 'ol'
      const item = (bullet ?? numbered)![1] ?? ''
      if (last?.kind === kind) last.items.push(item)
      else blocks.push({ kind, items: [item] })
    } else if (heading) {
      // There is no room for headings in a chat bubble; they read as a bold line.
      blocks.push({ kind: 'p', lines: [`**${(heading[1] ?? '').replace(/\*+/g, '')}**`] })
    } else if (line.trim() === '') {
      // A blank line ends the paragraph (and the list).
      if (last) blocks.push({ kind: 'p', lines: [] })
    } else if (last?.kind === 'p') {
      last.lines.push(line)
    } else {
      blocks.push({ kind: 'p', lines: [line] })
    }
  }

  return blocks.filter((block) => (block.kind === 'p' ? block.lines.length > 0 : true))
}

/**
 * Renders the small part of Markdown a model uses in a chat answer: paragraphs, bold, italics, inline code,
 * links (also bare addresses), bullet and numbered lists, and headings as bold lines. Everything else is shown as
 * written. It builds React elements, never HTML, so nothing in the text can inject markup; only http, https and
 * mailto links are made. A piece that is still arriving (`**Back`) is shown as it is until it is complete.
 */
export function renderMarkdown(source: string): ReactNode {
  return toBlocks(source).map((block, index) => {
    const spacing = index === 0 ? '' : 'mt-2'

    if (block.kind === 'p') {
      return (
        <p key={index} className={spacing || undefined}>
          {renderInline(block.lines.join('\n'))}
        </p>
      )
    }

    const List = block.kind
    return (
      <List
        key={index}
        className={[spacing, 'pl-5', block.kind === 'ul' ? 'list-disc' : 'list-decimal', 'whitespace-normal']
          .join(' ')
          .trim()}
      >
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item)}</li>
        ))}
      </List>
    )
  })
}
