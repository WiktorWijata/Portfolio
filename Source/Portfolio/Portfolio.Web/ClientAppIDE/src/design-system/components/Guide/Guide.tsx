import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import { Button, ButtonSize, ButtonVariant } from '../Button'
import { Link } from '../Link'
import { FontFamily, FontSize, FontWeight, Text, TextColor } from '../Text'
import type { GuideCardProps, GuideHighlightProps, GuideHighlightRect, GuideShadeProps } from './Guide.types'

const EDGE = 12
const GAP = 16

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

export function GuideShade({ className = '', ...rest }: GuideShadeProps) {
  return <div className={['fixed inset-0 z-[9990] bg-black/[.467]', className].join(' ')} {...rest} />
}

export function GuideHighlight({ rect, className = '' }: GuideHighlightProps) {
  return (
    <div
      aria-hidden
      style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
      className={[
        'pointer-events-none fixed z-[9991]',
        'rounded-lg border border-link bg-accent/[.04] shadow-[0_0_0_3px_rgba(199,125,187,.125)]',
        className,
      ].join(' ')}
    />
  )
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
        const buttons = [...(cardRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)') ?? [])]
        if (!buttons.length) return
        e.preventDefault()
        const index = buttons.indexOf(document.activeElement as HTMLElement)
        buttons[(index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus()
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
        'rounded-2xl border border-border-tour bg-tour leading-[1.65] shadow-tour',
        className,
      ].join(' ')}
    >
      <Text as="small" size={FontSize.XXSmall} font={FontFamily.Mono} className="block tracking-[.07em] text-[#bf94b8]">
        PRZEWODNIK / {step} Z {totalSteps}
      </Text>
      <Text
        as="h2"
        id={titleId}
        size={FontSize.Title}
        weight={FontWeight.Medium}
        className="my-2.5 leading-[1.3] text-[#eee6ed]"
      >
        {title}
      </Text>
      <Text as="p" className={actionLabel ? 'm-0' : 'm-0 mb-5'}>
        {children}
        {translation && (
          <Text className="mt-2.5 block border-t border-t-[#4a3f4a] pt-2.5 text-text-en italic">{translation}</Text>
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
