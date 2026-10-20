import { ALL_CATEGORIES } from '../Stack.consts'
import type { StackCategory, TechnologyGroup } from '../Stack.types'

/** Groups narrowed to a category and to the technologies whose name contains the query; empty groups are dropped. */
export function filterGroups(groups: TechnologyGroup[], category: StackCategory, query: string): TechnologyGroup[] {
  const needle = query.trim().toLowerCase()
  return groups
    .filter((group) => category === ALL_CATEGORIES || group.id === category)
    .map((group) => ({
      ...group,
      technologies: group.technologies.filter((technology) => technology.name.toLowerCase().includes(needle)),
    }))
    .filter((group) => group.technologies.length > 0)
}

export function countTechnologies(groups: TechnologyGroup[]): number {
  return groups.reduce((sum, group) => sum + group.technologies.length, 0)
}
