/**
 * Current value of a colour token of the active theme, e.g. `readThemeColor('accent')` → `#c77dbb`.
 * For the few places that cannot use a CSS variable or a utility class: an SVG data URI, a canvas.
 */
export function readThemeColor(token: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(`--color-${token}`).trim()
}
