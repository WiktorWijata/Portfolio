import type { ReactNode } from 'react'

/** Renders `text` in backticks as inline code; everything else stays plain text. */
export function renderRichText(text: string): ReactNode[] {
  return text.split('`').map((part, index) =>
    index % 2 ? (
      <code key={index} className="rounded-lg bg-tint/10 px-1.5 py-px font-mono text-[.92em]">
        {part}
      </code>
    ) : (
      part
    ),
  )
}
