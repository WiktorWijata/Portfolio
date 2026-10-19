import { useIsMobile, usePanels } from '@/context'
import { AppStatusBar, AppTitleBar, Assistant, EditorArea, Explorer, GuideTour, MobileShell, Rail } from './components'
import { GRID_EXPLORER_COLLAPSED, GRID_EXPLORER_OPEN } from './Shell.consts'

/** The IDE window: title bar, rail, Solution Explorer, tabs + editor area, status bar. On phones: the mobile shell. */
export function Shell() {
  const { explorerOpen } = usePanels()
  const isMobile = useIsMobile()

  if (isMobile) return <MobileShell />

  return (
    <div className="flex h-full flex-col overflow-hidden border border-line-default bg-surface-editor">
      <AppTitleBar />
      <div className={`grid min-h-0 flex-1 ${explorerOpen ? GRID_EXPLORER_OPEN : GRID_EXPLORER_COLLAPSED}`}>
        <Rail />
        {explorerOpen && (
          <div className="flex min-h-0">
            <Explorer />
          </div>
        )}
        <EditorArea />
      </div>
      <AppStatusBar />
      <Assistant />
      <GuideTour />
    </div>
  )
}
