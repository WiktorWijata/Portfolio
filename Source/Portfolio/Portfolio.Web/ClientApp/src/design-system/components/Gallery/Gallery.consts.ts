import type { GalleryLabels } from './Gallery.types'

export const DEFAULT_LABELS: GalleryLabels = {
  carousel: 'karuzela',
  previous: 'Poprzedni slajd',
  next: 'Następny slajd',
  slides: 'Wybierz slajd',
  slide: (number) => `Pokaż slajd ${number}`,
  placeholder: (number) => `Miejsce na zdjęcie ${number}`,
  placeholderNote: 'Podgląd projektu zostanie dodany później',
}
