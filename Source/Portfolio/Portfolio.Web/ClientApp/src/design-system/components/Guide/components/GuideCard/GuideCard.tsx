import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import { Button, ButtonSize, ButtonVariant } from '../../../Button'
import { Link } from '../../../Link'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../../../Text'
import { EDGE, FOCUSABLE_SELECTOR, GAP } from '../../Guide.consts'
import type { GuideHighlightRect } from '../../Guide.types'
import type { GuideCardProps } from './GuideCard.types'

/** Focusable elements that are actually reachable: excludes ones hidden by `display: none` or a hidden ancestor. */
function reachableFocusable(card: HTMLElement): HTMLElement[] {
  return [...card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter((el) => el.getClientRects().length > 0)
}

/** Places the card to the right of the anchor, else below it, else above it — always inside the window. */
function placeCard(card: HTMLElement, anchor: GuideHighlightRect) {
  const width = card.offsetWidth
  const height = card.offsetHeight
  let left = anchor.left + anchor.width + GAP
  let top = anchor.top
  if (left + width > window.innerWidth - EDGE) {
    left = Math.max(EDGE, Math.min(anchor.left, window.innerWidth - width - EDGE))
    top = anchor.top + anchor.height + GAP
  }
  if (top + height > window.innerHeight - EDGE) {
    top = Math.max(EDGE, Math.min(anchor.top - height - GAP, window.innerHeight - height - EDGE))
  }
  card.style.left = `${left}px`
  card.style.top = `${top}px`
}

export function GuideCard({
  step,
  totalSteps,
  title,
  children,
  translation,
  actionLabel,
  onAction,
  onSkip,
  onBack,
  onNext,
  isLastStep = false,
  modal = false,
  anchor,
  style,
  className = '',
}: GuideCardProps) {
  const titleId = useId()
  const cardRef = useRef<HTMLElement>(null)

  // Anchored card: position it next to the anchor (direct DOM write — no extra render).
  useLayoutEffect(() => {
    const card = cardRef.current
    if (!anchor || !card) return
    const update = () => placeCard(card, anchor)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [anchor, step])

  // Modal: focus "Dalej" on every step, and give the focus back when the guide closes.
  useEffect(() => {
    if (!modal) return
    const previous = document.activeElement as HTMLElement | null
    return () => previous?.focus()
  }, [modal])
  useEffect(() => {
    if (modal) cardRef.current?.querySelector<HTMLElement>('[data-guide-next]')?.focus()
  }, [modal, step])

  // Modal: Esc skips the guide; Tab cycles through the card's buttons only.
  useEffect(() => {
    if (!modal) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopImmediatePropagation()
        onSkip()
      } else if (e.key === 'Tab') {
        const focusable = cardRef.current ? reachableFocusable(cardRef.current) : []
        if (!focusable.length) return
        e.preventDefault()
        const index = focusable.indexOf(document.activeElement as HTMLElement)
        // Focus outside the card (index === -1): Shift+Tab should land on the last control, Tab on the first —
        // the generic modulo step lands one short of the last because -1 - 1 wraps past it.
        const next =
          index === -1
            ? e.shiftKey
              ? focusable.length - 1
              : 0
            : (index + (e.shiftKey ? -1 : 1) + focusable.length) % focusable.length
        focusable[next]?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [modal, onSkip])

  return (
    <Text
      ref={cardRef}
      as="section"
      size={FontSize.Large}
      font={FontFamily.Sans}
      color={TextColor.Body}
      role="dialog"
      aria-modal={modal || undefined}
      aria-labelledby={titleId}
      style={style}
      className={[
        'fixed z-[9992] box-border w-[340px] max-w-[calc(100vw-24px)] p-5',
        'rounded-2xl border border-accent-line-subtle bg-surface-overlay leading-[1.65] shadow-tour',
        className,
      ].join(' ')}
    >
      <Text
        as="small"
        size={FontSize.XXSmall}
        font={FontFamily.Mono}
        className="block tracking-[.07em] text-accent-muted"
      >
        PRZEWODNIK / {step} Z {totalSteps}
      </Text>
      <Text
        as="h2"
        id={titleId}
        size={FontSize.Title}
        weight={FontWeight.Medium}
        className="my-2.5 leading-[1.3] text-content-strong"
      >
        {title}
      </Text>
      <Text as="p" className={actionLabel ? 'm-0' : 'm-0 mb-5'}>
        {children}
        {translation && (
          <Text className="mt-2.5 block border-t border-t-line-emphasis pt-2.5 text-content-tertiary italic">
            {translation}
          </Text>
        )}
      </Text>
      {actionLabel && (
        <Link underline size={FontSize.Medium} weight={FontWeight.Medium} className="my-[14px]" onClick={onAction}>
          {actionLabel}
        </Link>
      )}
      <div className="flex items-center gap-2">
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm} onClick={onSkip}>
          Pomiń
        </Button>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm} onClick={onBack} disabled={!onBack}>
          Wstecz
        </Button>
        <Button size={ButtonSize.Sm} className="ml-auto" data-guide-next onClick={onNext}>
          {isLastStep ? 'Gotowe' : 'Dalej →'}
        </Button>
      </div>
    </Text>
  )
}
