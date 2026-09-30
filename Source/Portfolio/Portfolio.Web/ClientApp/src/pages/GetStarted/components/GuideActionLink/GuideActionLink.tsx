import { useTranslation } from 'react-i18next'
import { FontSize, Link } from '@/design-system'
import type { GuideActionLinkProps } from './GuideActionLink.types'

/** Accent-coloured text link under an intro or an article ("Poznaj mnie →", "Wypróbuj terminal →"). */
export function GuideActionLink({ action, onRun, className = '' }: GuideActionLinkProps) {
  const { t } = useTranslation()

  return (
    <Link
      size={FontSize.Small}
      className={['[&>span]:leading-[normal]', className].join(' ')}
      onClick={() => onRun(action)}
    >
      {t(action.labelKey)}
    </Link>
  )
}
