import type { GuideAction } from '../../GetStarted.types'

export interface GuideActionLinkProps {
  action: GuideAction
  onRun: (action: GuideAction) => void
  className?: string
}
