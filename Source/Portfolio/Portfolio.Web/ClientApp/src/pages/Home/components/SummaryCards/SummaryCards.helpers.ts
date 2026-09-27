import type { Experience } from '@/api'
import { formatPeriod } from '@/utils/period'
import type { HomeCareerItem } from '../../Home.types'

/** The most recent experiences as short career entries, newest first (backend already orders them so). */
export function toCareerItems(experiences: Experience[], count: number): HomeCareerItem[] {
  return experiences.slice(0, count).map((experience) => ({
    title: experience.position ?? '',
    company: experience.employer ?? '',
    period: formatPeriod(experience.startDate, experience.endDate),
  }))
}
