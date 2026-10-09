import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_SOLUTION, pagesInSolutionOrder, type PageId } from '@/navigation'
import { EditorContext } from './EditorContext'
import * as transitions from './EditorContext.transitions'
import type { Editor } from './EditorContext.types'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import { useUrlSync } from './hooks/useUrlSync'

/**
 * State of the editor area: open tabs (in order) and the active page. The active page is mirrored in the URL.
 * The solution (the file list) is static for now; this is where the list returned by the API will be stored.
 * State transitions themselves are pure functions in `EditorContext.transitions`; this component only wires
 * them to `useState` and to the URL (`useUrlSync`, which owns the History API side).
 */
export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() => transitions.initialEditorState(location.pathname, history.state))
  const [solution] = useState(DEFAULT_SOLUTION)
  const pageOrder = useMemo(() => pagesInSolutionOrder(solution), [solution])

  const showPage = useCallback((page: PageId | null) => setState((prev) => transitions.showPage(prev, page)), [])
  const closeTab = useCallback((id: PageId) => setState((prev) => transitions.closeTab(prev, id)), [])
  const reorderTabs = useCallback((order: string[]) => setState((prev) => transitions.reorderTabs(prev, order)), [])
  const onEmpty = useCallback(() => setState(transitions.emptyEditor()), [])

  useUrlSync(state.active, showPage, onEmpty)
  useDocumentTitle(state.active)

  const editor = useMemo<Editor>(
    () => ({
      solution,
      pageOrder,
      tabs: state.tabs,
      activePage: state.active,
      openPage: showPage,
      closeTab,
      reorderTabs,
    }),
    [solution, pageOrder, state, showPage, closeTab, reorderTabs],
  )

  return <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
}
