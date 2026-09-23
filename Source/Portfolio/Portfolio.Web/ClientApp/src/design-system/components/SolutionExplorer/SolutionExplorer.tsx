import { FontFamily, FontSize, Text, TextColor } from '../Text'
import { DEFAULT_LABELS } from './SolutionExplorer.consts'
import type { SolutionExplorerProps } from './SolutionExplorer.types'

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
        className={[
          'flex w-11 flex-col items-center border-r border-line-default bg-surface-hover py-1.5',
          className,
        ].join(' ')}
        {...rest}
      >
        {collapsedContent}
      </aside>
    )
  }

  return (
    <aside className={['flex flex-col border-r border-line-default bg-surface-hover', className].join(' ')} {...rest}>
      <div className="flex h-[35px] shrink-0 items-center justify-between gap-2 border-b border-line-default px-2.5 py-[5px]">
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
