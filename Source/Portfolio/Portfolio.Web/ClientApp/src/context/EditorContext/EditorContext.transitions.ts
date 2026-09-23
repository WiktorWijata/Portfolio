import { PageId, pageFromPath } from '@/navigation'
import type { EditorState } from './EditorContext.types'

/** Whether `order` contains exactly the ids of `tabs`, each once, in some order. */
function isPermutation(order: string[], tabs: PageId[]): order is PageId[] {
  return order.length === tabs.length && new Set(order).size === order.length && tabs.every((id) => order.includes(id))
}

/**
 * Restore an explicitly empty root history entry on reload. An unmarked root or unknown URL
 * opens the default page; other workspace state is not persisted.
 */
export function initialEditorState(pathname: string, historyState: unknown = null): EditorState {
  if (isEmptyEditorEntry(pathname, historyState)) return emptyEditor()
  const page = pageFromPath(pathname) ?? PageId.GetStarted
  return { tabs: [page], active: page }
}

/** Only the root URL with a literal boolean marker represents an empty editor. */
export function isEmptyEditorEntry(pathname: string, state: unknown): boolean {
  return pathname === '/' && typeof state === 'object' && state !== null && 'empty' in state && state.empty === true
}

/**
 * Shows `page`, opening a tab for it first if needed. `null` — the root `/`, or a URL reached via
 * back/forward that doesn't name a page — always falls back to the default page, the same way a fresh
 * mount does. This is never how the editor becomes empty; only `closeTab` produces that, deliberately,
 * by closing the last tab.
 */
export function showPage(state: EditorState, page: PageId | null): EditorState {
  const target = page ?? PageId.GetStarted
  return { tabs: state.tabs.includes(target) ? state.tabs : [...state.tabs, target], active: target }
}

/** Closes a tab. Closing the active tab activates its former neighbour, or leaves the editor empty. */
export function closeTab(state: EditorState, id: PageId): EditorState {
  const index = state.tabs.indexOf(id)
  if (index === -1) return state
  const tabs = state.tabs.filter((tab) => tab !== id)
  const active = state.active === id ? (tabs[index] ?? tabs[index - 1] ?? null) : state.active
  return { tabs, active }
}

/**
 * The empty editor: no tabs, nothing active. The only other place `active` is `null` — `showPage` — always
 * resolves it to the default page instead, so this is the sole, unambiguous producer of that state; `useUrlSync`
 * marks its history entry accordingly, so returning to it (Back/Forward) restores this and not the default page.
 */
export function emptyEditor(): EditorState {
  return { tabs: [], active: null }
}

/** Reorders the open tabs. Ignored if `order` is not exactly a permutation of the currently open tabs. */
export function reorderTabs(state: EditorState, order: string[]): EditorState {
  return isPermutation(order, state.tabs) ? { ...state, tabs: order } : state
}
