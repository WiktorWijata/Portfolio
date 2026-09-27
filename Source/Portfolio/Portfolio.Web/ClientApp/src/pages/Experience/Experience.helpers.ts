import type { Experience as ExperienceDto } from '@/api'
import { formatPeriod } from '@/utils/period'
import type { Position } from './Experience.types'

/** Maps API experiences to positions; the backend already orders them newest first. */
export function toPositions(experiences: ExperienceDto[]): Position[] {
  return experiences.map((experience, index) => ({
    id: String(index),
    period: formatPeriod(experience.startDate, experience.endDate),
    role: experience.position ?? '',
    company: experience.employer ?? '',
    groups: (experience.areas ?? []).map((area) => ({
      title: area.title ?? '',
      items: area.responsibilities ?? [],
    })),
    technologies: (experience.technologies ?? []).map((technology) => technology.name ?? ''),
  }))
}
