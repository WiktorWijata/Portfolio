import type { GuideAction, GuideArticleData } from '../../GetStarted.types'

export interface GuideArticleProps {
  article: GuideArticleData
  onAction: (action: GuideAction) => void
}
