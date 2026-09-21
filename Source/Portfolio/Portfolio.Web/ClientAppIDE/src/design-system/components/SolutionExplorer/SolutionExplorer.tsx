import { useState, type CSSProperties, type MouseEvent } from 'react'
import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { DEFAULT_LABELS } from './SolutionExplorer.consts'
import type { SolutionExplorerProps, TreeFileProps, TreeFolderProps } from './SolutionExplorer.types'

function indentStyle(level: number): CSSProperties {
  return { ['--tree-indent' as string]: `${level * 16}px` }
}

// Rows aren't nested inside padded ancestor containers here (TreeFolder itself adds no
// indent) — each row encodes its own indent purely via padding-left, so a plain w-full
// already gives a full-width hover/active background without needing a margin/width
// compensation trick.
const rowShape = 'box-border w-full rounded-none'

/**
 * Solution Explorer sidebar. `TreeFile`/`TreeFolder` are plain building blocks — callers nest them
 * to whatever depth they need, passing `level` for indentation, rather than this component owning
 * a recursive data-driven tree renderer.
 */
export function SolutionExplorer({
  tools,
  search,
  collapsed = false,
  collapsedContent,
  footer,
  labels,
  className = '',
  children,
  ...rest
}: SolutionExplorerProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }

  if (collapsed) {
    return (
      <aside
        className={['flex w-11 flex-col items-center border-r border-border bg-hover py-1.5', className].join(' ')}
        {...rest}
      >
        {collapsedContent}
      </aside>
    )
  }

  return (
    <aside className={['flex flex-col border-r border-border bg-hover', className].join(' ')} {...rest}>
      <div className="flex h-[35px] shrink-0 items-center justify-between gap-2 border-b border-border px-2.5 py-[5px]">
        <Text
          size={FontSize.Nano}
          font={FontFamily.Mono}
          color={TextColor.Faint}
          className="min-w-0 truncate tracking-[.08em] uppercase"
        >
          {strings.title}
        </Text>
        {tools && <div className="flex shrink-0 items-center gap-0.5">{tools}</div>}
      </div>
      {search && <div className="m-[5px_9px]">{search}</div>}
      <nav aria-label={strings.tree} className="flex flex-col overflow-y-auto py-1">
        {children}
      </nav>
      {footer && <div className="mt-auto shrink-0">{footer}</div>}
    </aside>
  )
}

export function TreeFile({ level = 0, active = false, icon, className = '', children, style, ...rest }: TreeFileProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      style={{ ...indentStyle(level), ...style }}
      className={[
        rowShape,
        'flex items-center gap-[7px] py-0.5 pr-2 pl-[calc(17px+var(--tree-indent,0px))]',
        'text-left',
        'transition-colors duration-150 ease-out',
        active
          ? 'bg-filter-active text-text shadow-[inset_2px_0_0_0_var(--color-accent)]'
          : 'bg-transparent text-text-muted hover:bg-explorer-hover',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text size={FontSize.Small} className="flex w-[18px] shrink-0 items-center justify-center">
        {icon}
      </Text>
      <Text size={FontSize.Small} font={FontFamily.Sans} className="truncate">
        {children}
      </Text>
    </button>
  )
}

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
            ? 'bg-filter-active text-text shadow-[inset_2px_0_0_0_var(--color-accent)]'
            : 'text-text-muted hover:bg-explorer-hover',
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
