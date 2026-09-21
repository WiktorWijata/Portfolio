import { useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { FontFamily, FontSize, IconButton, IconButtonSize, Text, TextColor } from '@/design-system'

// comment | string | tag | keyword | number | attribute
const TOKEN =
  /(\/\/.*$|\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.]*)|\b(import|from|export|const|let|function|return|type|interface|as|true|false|null|undefined)\b|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w-]*)(?==)/gm

const classes = [
  'italic text-text-faint',
  'text-file-cs',
  'text-accent-light',
  'text-accent',
  'text-explorer-active',
  'text-num-02',
]

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of code.matchAll(TOKEN)) {
    const index = m.index ?? 0
    if (index > last) out.push(code.slice(last, index))
    const group = m.slice(1).findIndex((g) => g !== undefined)
    out.push(
      <span key={index} className={classes[group]}>
        {m[0]}
      </span>,
    )
    last = index + m[0].length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-5 bg-shell">
      <IconButton
        size={IconButtonSize.Sm}
        icon={copied ? <Check /> : <Copy />}
        aria-label={copied ? 'Skopiowano' : 'Kopiuj kod'}
        onClick={copy}
        className="absolute top-3 right-3 z-[1]"
      />
      <pre className="m-0 scrollbar-subtle overflow-x-auto p-5 pr-14">
        <Text
          as="div"
          size={FontSize.Small}
          font={FontFamily.Mono}
          color={TextColor.Body}
          className="leading-[1.7] whitespace-pre"
        >
          <code>{highlight(code)}</code>
        </Text>
      </pre>
    </div>
  )
}
