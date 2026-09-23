import { useEffect, useRef, useState } from 'react'
import { pageFromPath, pages, type PageId } from '@/navigation'
import { isEmptyEditorEntry } from '../../EditorContext.transitions'

/** What a URL history entry this hook wrote represents — carried in `history.state`. */
interface UrlState {
  /** Marks the empty-editor entry, so returning to it (Back/Forward) restores it and not the default page —
   * `location.pathname` alone can't tell the two apart, since both use `/`. */
  empty?: true
}

/**
 * Keeps the address bar and the active page in step, so links and the back button work: the active page is
 * pushed to the URL, and a back/forward navigation is reported through `onNavigate` (a known or unknown page)
 * or `onEmpty` (the empty-editor entry, identified by `history.state`, not by its URL).
 *
 * The first sync, and any correction that follows a back/forward navigation (an unknown route falling back
 * to the default page, a trailing slash), replace the history entry instead of adding one — only an actual
 * user action (opening a tab, closing the last one) pushes a new one. Without this, resolving an unknown URL
 * reached via Back would itself push a further entry, breaking Back/Forward. `popStateTick` forces the
 * correction to run even when the resolved page turns out to be the one already active (two different
 * unknown routes back to back) — `active` alone wouldn't change in that case, so an effect keyed only on it
 * would miss the address bar fixup.
 *
 * Query string and hash are never touched when the path already matches (a known route keeps whatever it
 * arrived with); a correction (unknown route, trailing slash) writes the bare canonical path and so drops
 * them — there is currently nothing in this app that reads either.
 */
export function useUrlSync(active: PageId | null, onNavigate: (page: PageId | null) => void, onEmpty: () => void) {
  const synced = useRef(false)
  const fromPopState = useRef(false)
  const [popStateTick, setPopStateTick] = useState(0)

  // active page -> URL
  useEffect(() => {
    const path = active ? pages[active].path : '/'
    const empty = active === null
    const currentlyEmpty = isEmptyEditorEntry(location.pathname, history.state)
    if (location.pathname !== path || empty !== currentlyEmpty) {
      const state: UrlState | null = empty ? { empty: true } : null
      if (!synced.current || fromPopState.current) history.replaceState(state, '', path)
      else history.pushState(state, '', path)
    }
    synced.current = true
    fromPopState.current = false
  }, [active, popStateTick])

  // URL -> active page (back / forward)
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      fromPopState.current = true
      if (isEmptyEditorEntry(location.pathname, e.state)) onEmpty()
      else onNavigate(pageFromPath(location.pathname))
      setPopStateTick((n) => n + 1)
    }
    addEventListener('popstate', onPopState)
    return () => removeEventListener('popstate', onPopState)
  }, [onNavigate, onEmpty])
}
