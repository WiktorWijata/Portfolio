import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { pages, type PageId } from '@/navigation'
import { APP_TITLE } from '../../EditorContext.consts'

/** Browser tab title: the open page's tab name and the app title. */
export function useDocumentTitle(active: PageId | null) {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = active ? `${t(pages[active].tab)} — ${APP_TITLE}` : APP_TITLE
  }, [active, t])
}
