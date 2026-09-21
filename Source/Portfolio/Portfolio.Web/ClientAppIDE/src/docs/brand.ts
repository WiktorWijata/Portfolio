// OrchIDE UI mark: a front-view phalaenopsis orchid — dorsal sepal, two broad petals,
// two lower sepals and the lip, layered in tones of one color.
export interface MarkEllipse {
  cx: number
  cy: number
  rx: number
  ry: number
  /** Rotation in degrees around the ellipse center. */
  rotate?: number
  opacity: number
}

export const MARK_ELLIPSES: MarkEllipse[] = [
  { cx: 16, cy: 7.6, rx: 3.7, ry: 6.2, opacity: 0.5 },
  { cx: 10.4, cy: 22.4, rx: 3.2, ry: 6.4, rotate: 38, opacity: 0.5 },
  { cx: 21.6, cy: 22.4, rx: 3.2, ry: 6.4, rotate: -38, opacity: 0.5 },
  { cx: 8.4, cy: 14.6, rx: 7.4, ry: 5.6, rotate: -16, opacity: 0.78 },
  { cx: 23.6, cy: 14.6, rx: 7.4, ry: 5.6, rotate: 16, opacity: 0.78 },
]

export const MARK_LIP =
  'M16 15.2c2.8 0 4.3 2.1 3.4 4.4-.6 1.6-1.9 3-3.4 4.5-1.5-1.5-2.8-2.9-3.4-4.5-.9-2.3.6-4.4 3.4-4.4Z'
export const MARK_COLUMN = { cx: 16, cy: 15, r: 1.15 }

export function ellipseTransform(e: MarkEllipse) {
  return e.rotate ? `rotate(${e.rotate} ${e.cx} ${e.cy})` : undefined
}

export function markFaviconHref() {
  const petals = MARK_ELLIPSES.map((e) => {
    const t = ellipseTransform(e)
    return `<ellipse cx="${e.cx}" cy="${e.cy}" rx="${e.rx}" ry="${e.ry}" opacity="${e.opacity}"${t ? ` transform="${t}"` : ''}/>`
  }).join('')
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">` +
    `<rect width="32" height="32" rx="8" fill="#232428"/>` +
    `<g transform="translate(16 16) scale(.8) translate(-16 -15)" fill="#c77dbb">${petals}` +
    `<path d="${MARK_LIP}"/><circle cx="${MARK_COLUMN.cx}" cy="${MARK_COLUMN.cy}" r="${MARK_COLUMN.r}" fill="#232428" opacity=".85"/></g></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
