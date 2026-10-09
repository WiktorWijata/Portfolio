import type { GuideCardLabels } from './components/GuideCard/GuideCard.types'

export const DEFAULT_CARD_LABELS: GuideCardLabels = {
  progress: (step, totalSteps) => `PRZEWODNIK / ${step} Z ${totalSteps}`,
  skip: 'Pomiń',
  back: 'Wstecz',
  next: 'Dalej →',
  done: 'Gotowe',
}

export const EDGE = 12

export const GAP = 16

// Standard focus-trap query: links with a destination, enabled form controls, and anything with a tabindex —
// not just `<button>`, so a future link or field in the card joins the Tab cycle instead of falling outside it.
export const FOCUSABLE_SELECTOR =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
