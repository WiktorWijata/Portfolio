import { useEditor } from '@/context'
import { PageView } from '@/pages'
import { AppTerminal } from '../AppTerminal'
import { EditorTabs } from '../EditorTabs'
import { EmptyEditor } from '../EmptyEditor'

/**
 * Main column of the window: the tab strip and the active page (or the empty-editor screen).
 *
 * The terminal overlays the bottom of the page instead of taking height from it, so the page and its
 * background keep their size when the terminal opens. It sits after the page inside the scroll area
 * with `sticky bottom-0`: it adds its own height to the scrollable extent (so the bottom of the page
 * can be scrolled from under it) and stays pinned to the bottom edge of the visible area.
 */
export function EditorArea() {
  const { activePage, tabs } = useEditor()

  return (
    <main className="flex min-h-0 min-w-0 flex-col bg-surface-editor">
      {tabs.length > 0 && <EditorTabs />}
      <div className="min-h-0 flex-1 scrollbar-subtle [scrollbar-gutter:stable] overflow-y-auto">
        <div className="flex min-h-full flex-col">{activePage ? <PageView id={activePage} /> : <EmptyEditor />}</div>
        <div className="sticky bottom-0 z-10">
          <AppTerminal />
        </div>
      </div>
    </main>
  )
}
