import { usePanels } from '@/context'
import { AppStatusBar, AppTitleBar, Assistant, EditorArea, Explorer, GuideTour, Rail } from './components'
import { GRID_EXPLORER_COLLAPSED, GRID_EXPLORER_OPEN } from './Shell.consts'

/** The IDE window: title bar, rail, Solution Explorer, tabs + editor area, status bar. */
export function Shell() {
  const { explorerOpen } = usePanels()

  return (
    <div className="flex h-full flex-col overflow-hidden border border-line-default bg-surface-editor">
      <AppTitleBar />
      <div className={`grid min-h-0 flex-1 ${explorerOpen ? GRID_EXPLORER_OPEN : GRID_EXPLORER_COLLAPSED}`}>
        <Rail />
        {explorerOpen && (
          <div className="flex min-h-0 max-bp570:max-h-[200px] max-bp570:border-b max-bp570:border-line-strong">
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
