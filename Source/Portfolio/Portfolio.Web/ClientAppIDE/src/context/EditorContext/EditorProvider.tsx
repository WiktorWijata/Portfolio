import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_SOLUTION, PageId, pageFromPath, pagesInSolutionOrder } from '@/navigation'
import { EditorContext } from './EditorContext'
import type { Editor, EditorState } from './EditorContext.types'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import { useUrlSync } from './hooks/useUrlSync'

/**
 * State of the editor area: open tabs (in order) and the active page. The active page is mirrored in the URL.
 * The solution (the file list) is static for now; this is where the list returned by the API will be stored.
 */
export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<EditorState>(() => {
    const page = pageFromPath(location.pathname) ?? PageId.GetStarted
    return { tabs: [page], active: page }
  })
  const [solution] = useState(DEFAULT_SOLUTION)
  const pageOrder = useMemo(() => pagesInSolutionOrder(solution), [solution])

  /** Shows a page, opening a tab for it first if needed. `null` (an unknown URL) shows nothing. */
  const showPage = useCallback((page: PageId | null) => {
    setState((prev) => ({
      tabs: page && !prev.tabs.includes(page) ? [...prev.tabs, page] : prev.tabs,
      active: page,
    }))
  }, [])

  const closeTab = useCallback((id: PageId) => {
    setState((prev) => {
      const index = prev.tabs.indexOf(id)
      if (index === -1) return prev
      const tabs = prev.tabs.filter((tab) => tab !== id)
      const active = prev.active === id ? (tabs[index] ?? tabs[index - 1] ?? null) : prev.active
      return { tabs, active }
    })
  }, [])

  const reorderTabs = useCallback((order: PageId[]) => {
    setState((prev) => ({ ...prev, tabs: order }))
  }, [])

  useUrlSync(state.active, showPage)
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
