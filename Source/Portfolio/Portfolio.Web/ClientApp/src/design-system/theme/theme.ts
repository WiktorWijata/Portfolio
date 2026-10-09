/** Themes of the design system. A theme is a set of colour tokens in `theme/<name>.css`, chosen by `data-theme`. */
export const ThemeName = {
  Dark: 'dark',
  Light: 'light',
} as const
export type ThemeName = (typeof ThemeName)[keyof typeof ThemeName]

/** The theme that applies when `data-theme` is not set (its tokens live in `theme/dark.css`). */
export const DEFAULT_THEME: ThemeName = ThemeName.Dark

/** Attribute of the `<html>` element that selects the theme. It has to sit on `<html>`: the derived tokens resolve there. */
export const THEME_ATTRIBUTE = 'data-theme'

/** `localStorage` key of the chosen theme. Also read by the inline script in index.html and docs.html. */
export const THEME_STORAGE_KEY = 'orchide-ui.theme'

export function isThemeName(value: unknown): value is ThemeName {
  return Object.values<unknown>(ThemeName).includes(value)
}

/** Switches the document to the given theme (without remembering it — see `setTheme`). */
export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
}
