import { useSyncExternalStore } from 'react'
import { MOBILE_MEDIA_QUERY } from './PanelsContext.consts'

function subscribe(onChange: () => void) {
  const query = matchMedia(MOBILE_MEDIA_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getSnapshot = () => matchMedia(MOBILE_MEDIA_QUERY).matches

/** Whether the viewport is phone-sized — the app then swaps the IDE window for the mobile shell. */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
