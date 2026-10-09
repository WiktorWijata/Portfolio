import type { Experience } from '@/api'

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25

/** Full years since the earliest experience started, rounded down — e.g. "7+ lat doświadczenia". */
export function computeYearsOfExperience(experiences: Experience[]): number {
  const startDates = experiences.map((e) => e.startDate).filter((date): date is string => Boolean(date))
  if (startDates.length === 0) return 0

  const earliestStart = startDates.reduce((min, date) => (date < min ? date : min))
  return Math.floor((Date.now() - new Date(earliestStart).getTime()) / MS_PER_YEAR)
}

/** Number of distinct employers across all experiences — e.g. "4 firmy i zespoły". */
export function countEmployers(experiences: Experience[]): number {
  return new Set(experiences.map((e) => e.employer).filter(Boolean)).size
}
