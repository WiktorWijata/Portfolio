import { FontSize, Link, LinkTone } from '@/design-system'
import type { GuideActionLinkProps } from './GuideActionLink.types'

/** Blue text link under an intro or an article ("Poznaj mnie →", "Wypróbuj terminal →"). */
export function GuideActionLink({ action, onRun, className = '' }: GuideActionLinkProps) {
  return (
    <Link
      tone={LinkTone.Info}
      size={FontSize.Small}
      className={['[&>span]:leading-[normal]', className].join(' ')}
      onClick={() => onRun(action)}
    >
      {action.label}
    </Link>
  )
}
