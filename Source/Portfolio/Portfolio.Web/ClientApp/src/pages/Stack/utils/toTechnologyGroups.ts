import type { SkillCategory, Technology as TechnologyDto } from '@/api'
import type { TechnologyGroup } from '../Stack.types'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/'
const SIMPLE_ICONS = 'https://cdn.simpleicons.org/'

/** Builds the icon URL for a technology from its source (Devicon/SimpleIcons) and slug. */
function toIconUrl(technology: TechnologyDto): string | undefined {
  if (!technology.iconSlug) return undefined
  if (technology.iconSource === 'SimpleIcons') return `${SIMPLE_ICONS}${technology.iconSlug}`
  return `${DEVICON}${technology.iconSlug}/${technology.iconSlug}-original.svg`
}

/** Maps API skill categories to the page's technology groups (the category name doubles as its filter id). */
export function toTechnologyGroups(categories: SkillCategory[]): TechnologyGroup[] {
  return categories.map((category) => ({
    id: category.name ?? '',
    label: category.name ?? '',
    technologies: (category.technologies ?? []).map((technology) => ({
      name: technology.name ?? '',
      icon: toIconUrl(technology),
      monochrome: technology.iconIsMonochrome ?? undefined,
    })),
  }))
}
