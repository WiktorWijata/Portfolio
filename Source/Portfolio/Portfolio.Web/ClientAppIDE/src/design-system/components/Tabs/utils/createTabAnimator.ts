import { DROP_ANIMATION, SLIDE_ANIMATION } from '../Tabs.consts'
import { tabsOf } from './tabElements'

/**
 * Animations of the tab strip (Web Animations API). It remembers the running animation of each tab so that a new
 * one can replace it, and does nothing visible when the visitor prefers reduced motion.
 */
export function createTabAnimator(container: HTMLElement, reducedMotion: MediaQueryList) {
  const running = new Map<HTMLElement, Animation>()

  function cancel(el: HTMLElement) {
    running.get(el)?.cancel()
    running.delete(el)
  }

  function play(el: HTMLElement, from: string, options: KeyframeAnimationOptions) {
    const animation = el.animate([{ transform: from }, { transform: 'translateX(0)' }], options)
    running.set(el, animation)
    animation.onfinish = () => {
      if (running.get(el) === animation) running.delete(el)
    }
  }

  /** Left edge of a tab without the transform of a drag or an animation (which is cancelled). */
  function layoutLeft(el: HTMLElement): number {
    const transform = el.style.transform
    el.style.transform = 'none'
    cancel(el)
    const left = el.getBoundingClientRect().left
    el.style.transform = transform
    return left
  }

  /** Runs `change` (which reorders the tabs) and slides every other tab from its old position to the new one. */
  function animateOrder(change: () => void, dragged?: HTMLElement) {
    const others = tabsOf(container).filter((el) => el !== dragged)
    const before = new Map(others.map((el) => [el, el.getBoundingClientRect().left]))
    others.forEach(cancel)
    change()
    if (reducedMotion.matches) return
    for (const el of others) {
      const dx = (before.get(el) ?? 0) - el.getBoundingClientRect().left
      if (Math.abs(dx) >= 1) play(el, `translateX(${dx}px)`, SLIDE_ANIMATION)
    }
  }

  /** Lets a dropped tab settle from where it was released (`from` is its last transform). */
  function animateDrop(tab: HTMLElement, from: string) {
    if (!reducedMotion.matches && from) play(tab, from, DROP_ANIMATION)
  }

  return { cancel, layoutLeft, animateOrder, animateDrop }
}
