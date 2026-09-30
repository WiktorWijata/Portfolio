import type { ArchitectureBlock } from '@/design-system'
import type { ProjectArchitectureBlock } from '@/api'

/** Maps API architecture blocks to the diagram's blocks (`url` becomes `href`, nulls become absent). */
export function toDiagramBlocks(blocks: ProjectArchitectureBlock[]): ArchitectureBlock[] {
  return blocks.map((block) => ({
    title: block.title ?? '',
    note: block.note ?? undefined,
    href: block.url ?? undefined,
    linkLabel: block.linkLabel ?? undefined,
    connectionLabel: block.connectionLabel ?? undefined,
    children: block.children?.length ? toDiagramBlocks(block.children) : undefined,
  }))
}
