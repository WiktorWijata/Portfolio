import { useState, type MouseEvent } from 'react'
import { FontFamily, FontSize, Text, TextColor } from '../../../Text'
import { rowShape } from '../../SolutionExplorer.consts'
import { indentStyle } from '../../utils/indentStyle'
import type { TreeFolderProps } from './TreeFolder.types'

export function TreeFolder({
  level = 0,
  label,
  icon,
  defaultOpen = true,
  open: openProp,
  onToggle,
  active = false,
  onClick,
  children,
}: TreeFolderProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = openProp ?? internalOpen

  function toggle() {
    const next = !open
    if (openProp === undefined) setInternalOpen(next)
    onToggle?.(next)
  }

  return (
    <details open={open} className="group">
      <summary
        // Only the chevron toggles the folder — the rest of the row selects it,
        // so block <summary>'s native "click anywhere on the row" toggle behavior.
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          onClick?.()
        }}
        style={indentStyle(level)}
        className={[
          rowShape,
          'flex items-center gap-1.5 py-[3px] pr-2 pl-[calc(8px+var(--tree-indent,0px))]',
          'cursor-default',
          'transition-colors duration-150 ease-out',
          active
            ? 'bg-accent-surface text-content-strong shadow-[inset_2px_0_0_0_var(--color-accent)]'
            : 'text-content-secondary hover:bg-surface-active',
          'marker:content-none [&::-webkit-details-marker]:hidden',
        ].join(' ')}
      >
        <Text
          size={FontSize.Small}
          color={TextColor.Faint}
          onClick={(e: MouseEvent) => {
            // preventDefault here too — stopPropagation alone stops our summary
            // handler from running, but doesn't stop <details>'s own native
            // toggle, which would otherwise race the controlled `open` state.
            e.preventDefault()
            e.stopPropagation()
            toggle()
          }}
          className="inline-flex size-4 shrink-0 rotate-0 cursor-pointer items-center justify-center transition-transform duration-[120ms] group-open:rotate-90"
        >
          ›
        </Text>
        <Text size={FontSize.Small} color={TextColor.Faint} className="shrink-0 [&_svg]:size-4">
          {icon}
        </Text>
        <Text size={FontSize.Small} font={FontFamily.Sans} className="truncate">
          {label}
        </Text>
      </summary>
      {children}
    </details>
  )
}
