import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { useAspirations, useExperiences } from '@/api'
import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import {
  HOME_INFINITY_CONTROLS_LABEL,
  HOME_INFINITY_LABEL,
  HOME_INFINITY_NEXT_LABEL,
  HOME_INFINITY_PREVIOUS_LABEL,
  HOME_METRICS_TEAMS_LABEL,
  HOME_METRICS_YEARS_LABEL,
} from '../../Home.consts'
import { useInfinityCaption } from '../../hooks/useInfinityCaption'
import { computeYearsOfExperience, countEmployers } from './Metrics.helpers'

const cardClasses = 'rounded-xl border border-line-subtle bg-surface-panel/80 px-4 py-3.5'
const arrowButton =
  'focus-ring grid h-7 w-6 cursor-pointer place-items-center rounded-sm border-0 bg-transparent p-0 text-content-secondary transition-colors duration-150 ease-out hover:bg-accent/[.082] hover:text-accent-soft'

/** The "∞" metric: a caption you can flip through with the arrows (or ←/→ on the group). */
function InfinityMetric({ phrases }: { phrases: string[] }) {
  const { index, move } = useInfinityCaption(phrases.length)

  if (phrases.length === 0) return null

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }

  return (
    <div className={`${cardClasses} relative pr-[100px]`}>
      <Text
        as="strong"
        aria-label={HOME_INFINITY_LABEL}
        font={FontFamily.Sans}
        weight={FontWeight.Medium}
        className="block text-[36px] leading-none tracking-[-.03em] text-accent"
      >
        ∞
      </Text>
      <Text
        as="span"
        size={FontSize.Small}
        font={FontFamily.Sans}
        aria-live="polite"
        aria-atomic="true"
        className="mt-[3px] block min-h-[2.8em] leading-[1.4] text-content-muted"
      >
        {phrases[index]}
      </Text>
      {/* Arrow keys bubble up from the focused prev/next buttons. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="group"
        aria-label={HOME_INFINITY_CONTROLS_LABEL}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 right-3.5 flex -translate-y-1/2 items-center gap-[3px]"
      >
        <button
          type="button"
          aria-label={HOME_INFINITY_PREVIOUS_LABEL}
          className={arrowButton}
          onClick={() => move(-1)}
        >
          <ChevronLeft size={14} strokeWidth={1.4} aria-hidden />
        </button>
        <Text aria-hidden font={FontFamily.Mono} className="text-[10px] whitespace-nowrap text-content-dim">
          {index + 1} / {phrases.length}
        </Text>
        <button type="button" aria-label={HOME_INFINITY_NEXT_LABEL} className={arrowButton} onClick={() => move(1)}>
          <ChevronRight size={14} strokeWidth={1.4} aria-hidden />
        </button>
      </div>
    </div>
  )
}

/** Three figures under the intro: years of experience, teams, and the "∞" metric. */
export function Metrics() {
  const { data: aspirations } = useAspirations()
  const { data: experiences } = useExperiences()

  if (!aspirations || !experiences) return null

  const metrics = [
    { value: `${computeYearsOfExperience(experiences)}+`, label: HOME_METRICS_YEARS_LABEL },
    { value: `${countEmployers(experiences)}`, label: HOME_METRICS_TEAMS_LABEL },
  ]

  return (
    <div className="mt-[30px] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
      {metrics.map((metric) => (
        <div key={metric.label} className={cardClasses}>
          <Text
            as="strong"
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className="block text-[26px] tracking-[-.03em] text-accent"
          >
            {metric.value}
          </Text>
          <Text as="span" size={FontSize.Small} font={FontFamily.Sans} className="mt-[3px] block text-content-muted">
            {metric.label}
          </Text>
        </div>
      ))}
      <InfinityMetric phrases={aspirations.map((a) => a.text ?? '')} />
    </div>
  )
}
