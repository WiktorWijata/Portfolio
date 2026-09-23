import type { PageId, SolutionNode } from '@/navigation'

/** The editor area: which pages are open in tabs and which one is shown. */
export interface Editor {
  /** The solution tree (the list of files) — the source of truth for the order of pages everywhere. */
  solution: SolutionNode[]
  /** Pages in explorer order (depth-first); rail, shortcuts and terminal commands follow it. */
  pageOrder: PageId[]
  /** Open editor tabs, in display order. */
  tabs: PageId[]
  /** Page shown in the editor area, or `null` when every tab is closed. */
  activePage: PageId | null
  /** Opens the page in a tab (once) and makes it active. */
  openPage: (id: PageId) => void
  closeTab: (id: PageId) => void
  /** Reorders the open tabs. Ignored if `order` is not exactly a permutation of the currently open tabs. */
  reorderTabs: (order: string[]) => void
}

/** Which tabs are open and which is active (the part of the editor that changes). */
export interface EditorState {
  tabs: PageId[]
  active: PageId | null
}
