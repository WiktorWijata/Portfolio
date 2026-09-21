import { useEffect } from 'react'
import { pages, type PageId } from '@/navigation'
import { APP_TITLE } from '../../EditorContext.consts'

/** Browser tab title: the open page's tab name and the app title. */
export function useDocumentTitle(active: PageId | null) {
  useEffect(() => {
    document.title = active ? `${pages[active].tab} — ${APP_TITLE}` : APP_TITLE
  }, [active])
}
