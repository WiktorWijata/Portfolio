import { useEffect, useRef } from 'react'
import { pageFromPath, pages, type PageId } from '@/navigation'

/**
 * Keeps the address bar and the active page in step, so links and the back button work:
 * the active page is pushed to the URL, and a back/forward navigation is reported through `onNavigate`.
 * The first sync replaces the history entry instead of adding one.
 */
export function useUrlSync(active: PageId | null, onNavigate: (page: PageId | null) => void) {
  const synced = useRef(false)

  // active page -> URL
  useEffect(() => {
    const path = active ? pages[active].path : '/'
    if (location.pathname !== path) {
      if (synced.current) history.pushState(null, '', path)
      else history.replaceState(null, '', path)
    }
    synced.current = true
  }, [active])

  // URL -> active page (back / forward)
  useEffect(() => {
    const onPopState = () => onNavigate(pageFromPath(location.pathname))
    addEventListener('popstate', onPopState)
    return () => removeEventListener('popstate', onPopState)
  }, [onNavigate])
}
