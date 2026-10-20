// Present as a literal string so Tailwind's scanner generates these utilities even
// though they're applied via className at runtime, not written directly in JSX.
export const DRAGGING_CLASSES = 'relative z-[5] opacity-[.96] bg-surface-hover-strong shadow-drag'

/** How far the pointer must move (px) before a press turns into a drag. */
export const DRAG_THRESHOLD = 6
/** Width (px) of the zones at both ends of the strip in which a drag scrolls it. */
export const EDGE_ZONE = 36
/** Fastest scroll of the strip during a drag (px per frame) and how quickly it builds up towards the edge. */
export const MAX_SCROLL_SPEED = 12
export const SCROLL_SPEED_DIVISOR = 3
/** The dragged tab passes a neighbour once it is this far (px) beyond the neighbour's centre. */
export const SWAP_TOLERANCE = 3

const EASING = 'cubic-bezier(.2,.8,.2,1)'
/** Neighbours sliding out of the way, and the dropped tab settling into place. */
export const SLIDE_ANIMATION: KeyframeAnimationOptions = { duration: 180, easing: EASING }
export const DROP_ANIMATION: KeyframeAnimationOptions = { duration: 160, easing: EASING }
