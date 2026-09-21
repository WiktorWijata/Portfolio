import { useMemo, useState } from 'react'
import { Language } from '@/context'
import { GuideCard, GuideHighlight, GuideShade } from '@/design-system'
import type { TourTarget } from '@/components/Shell/Shell.consts'
import { usePreferences } from '@/context'
import { HIGHLIGHT_PADDING, TOUR_ACTION_LABELS, TOUR_STEPS } from '../../GuideTour.consts'
import { useTourTarget } from '../../hooks/useTourTarget'

const NO_TARGETS: TourTarget[] = []

/** The running tour: shade, spotlight on the current target and the step card. */
export function TourSteps() {
  const { endTour, language, setLanguage } = usePreferences()
  const [step, setStep] = useState(0)
  const current = TOUR_STEPS[step]
  const isLast = step === TOUR_STEPS.length - 1
  const rect = useTourTarget(current?.targets ?? NO_TARGETS)
  const spotlight = useMemo(
    () =>
      rect && {
        top: rect.top - HIGHLIGHT_PADDING,
        left: rect.left - HIGHLIGHT_PADDING,
        width: rect.width + 2 * HIGHLIGHT_PADDING,
        height: rect.height + 2 * HIGHLIGHT_PADDING,
      },
    [rect],
  )

  if (!current) return null

  return (
    <>
      <GuideShade />
      {spotlight && <GuideHighlight rect={spotlight} />}
      <GuideCard
        modal
        anchor={rect ?? undefined}
        step={step + 1}
        totalSteps={TOUR_STEPS.length}
        title={current.title}
        translation={current.translation}
        actionLabel={current.action && TOUR_ACTION_LABELS[current.action]}
        onAction={() => setLanguage(language === Language.Pl ? Language.En : Language.Pl)}
        isLastStep={isLast}
        onSkip={endTour}
        onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
        onNext={() => (isLast ? endTour() : setStep((s) => s + 1))}
      >
        {current.text}
      </GuideCard>
    </>
  )
}
