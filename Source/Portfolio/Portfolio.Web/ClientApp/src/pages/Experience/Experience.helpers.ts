import type { TFunction } from 'i18next'
import type { Experience as ExperienceDto } from '@/api'
import { formatPeriod } from '@/utils/period'
import type { Position } from './Experience.types'
import { COMMON_KEYS } from '@/i18n/common.keys'

/** Maps API experiences to positions; the backend already orders them newest first. */
export function toPositions(experiences: ExperienceDto[], t: TFunction): Position[] {
  return experiences.map((experience, index) => ({
    id: String(index),
    period: formatPeriod(experience.startDate, experience.endDate, t(COMMON_KEYS.present)),
    role: experience.position ?? '',
    company: experience.employer ?? '',
    groups: (experience.areas ?? []).map((area) => ({
      title: area.title ?? '',
      items: area.responsibilities ?? [],
    })),
    technologies: (experience.technologies ?? []).map((technology) => technology.name ?? ''),
  }))
}
