import type { ArchitectureBlock, GallerySlide } from '@/design-system'
import type { ProjectArchitectureBlock, ProjectImage } from '@/api'

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

/**
 * Slides of the gallery from the project's images (the ones without an address are skipped). A project with no
 * images yet gets `placeholders` empty slides, which the gallery shows as "a place for a photo".
 */
export function toGallerySlides(
  images: ProjectImage[],
  placeholders: number,
  placeholderAlt: (number: number) => string,
): GallerySlide[] {
  const slides = images.flatMap((image, index) =>
    image.url ? [{ src: image.url, alt: image.alt || placeholderAlt(index + 1) }] : [],
  )
  if (slides.length > 0) return slides

  return Array.from({ length: placeholders }, (_, index) => ({ alt: placeholderAlt(index + 1) }))
}
