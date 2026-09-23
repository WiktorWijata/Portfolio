import { PageId } from '@/navigation'

export const EMPTY_EDITOR_TITLE = 'WiktorWijata.Portfolio'
export const EMPTY_EDITOR_LOGO = '</>'
export const EMPTY_EDITOR_TEXT = 'Brak otwartych plików. Otwórz jeden z poniższych, aby wrócić do portfolio.'
export const EMPTY_EDITOR_CV_LABEL = 'Pobierz CV'
export const EMPTY_EDITOR_CONTACT_LABEL = 'Kontakt'
export const EMPTY_EDITOR_LINKS_LABEL = 'CV i kontakt'
export const EMPTY_EDITOR_QUICK_ACCESS_TITLE = 'Szybki dostęp'

/**
 * Pages offered in "Szybki dostęp" and the label shown for each. Their order is not set here: the
 * list follows the order of pages in the solution (the files in the Solution Explorer).
 */
export const QUICK_ACCESS_LABELS: Partial<Record<PageId, string>> = {
  [PageId.Home]: 'O mnie',
  [PageId.Projects]: 'Wybrane projekty',
  [PageId.Stack]: 'Stack technologiczny',
  [PageId.Experience]: 'Doświadczenie',
  [PageId.Contact]: 'Kontakt',
}
