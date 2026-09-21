import { EDGE_ZONE, MAX_SCROLL_SPEED, SCROLL_SPEED_DIVISOR } from '../Tabs.consts'

/**
 * How far the strip scrolls in one frame while a tab is dragged at horizontal position `x` (px): 0 in the middle,
 * negative near the left edge and positive near the right edge, faster the closer to the edge.
 */
export function autoScrollSpeed(x: number, left: number, right: number): number {
  if (x < left + EDGE_ZONE) return -Math.min(MAX_SCROLL_SPEED, (left + EDGE_ZONE - x) / SCROLL_SPEED_DIVISOR)
  if (x > right - EDGE_ZONE) return Math.min(MAX_SCROLL_SPEED, (x - right + EDGE_ZONE) / SCROLL_SPEED_DIVISOR)
  return 0
}
