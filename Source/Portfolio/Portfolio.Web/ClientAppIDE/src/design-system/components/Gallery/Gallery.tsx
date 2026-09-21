import type { KeyboardEvent } from 'react'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import { DEFAULT_LABELS } from './Gallery.consts'
import type { GalleryProps } from './Gallery.types'

const controlButtonClasses =
  'w-9 h-9 p-0 flex items-center justify-center border border-border-6 rounded-md text-[#d4c9d6] hover:bg-[#443240] hover:border-accent transition-colors duration-150 ease-out'

export function Gallery({
  heading = 'GALERIA PROJEKTU',
  labels,
  slides,
  activeIndex,
  onActiveIndexChange,
  className = '',
  ...rest
}: GalleryProps) {
  const strings = { ...DEFAULT_LABELS, ...labels }
  const slide = slides[activeIndex]

  function move(delta: number) {
    onActiveIndexChange((activeIndex + delta + slides.length) % slides.length)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      move(e.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  if (!slide) return null

  return (
    // Arrow keys are handled here but always come from the focused prev/next/dot buttons (they bubble up).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <section
      aria-roledescription={strings.carousel}
      onKeyDown={onKeyDown}
      className={['overflow-hidden rounded-2xl border border-border-5 bg-card', className].join(' ')}
      {...rest}
    >
      <Text
        as="div"
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        weight={FontWeight.Medium}
        className="border-b border-b-chip-line px-4 py-3 leading-[normal] tracking-[.07em] text-text-panel-title"
      >
        {heading}
      </Text>

      <div className="flex aspect-video items-center justify-center p-5 [background:radial-gradient(ellipse_at_center,rgba(199,125,187,.07),transparent_70%),#202226]">
        {slide.src ? (
          <img src={slide.src} alt={slide.alt} className="block h-full w-full object-contain" />
        ) : (
          <Text
            as="div"
            size={FontSize.Medium}
            font={FontFamily.Sans}
            className="flex flex-col items-center gap-[13px] text-center leading-[normal] text-[#8f929c]"
          >
            <Text
              aria-hidden
              font={FontFamily.Mono}
              className="flex h-11 w-14 items-center justify-center rounded-lg border border-dashed border-[#66606d] text-[24px] text-accent"
            >
              ▧
            </Text>
            <Text>{strings.placeholder(activeIndex + 1)}</Text>
            <Text as="small" size={FontSize.XSmall} className="leading-[normal] text-[#727780]">
              {strings.placeholderNote}
            </Text>
          </Text>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-t-chip-line px-3.5 py-2.5">
        <button type="button" aria-label={strings.previous} onClick={() => move(-1)} className={controlButtonClasses}>
          <Text size={FontSize.Title} className="leading-none">
            ‹
          </Text>
        </button>

        <div className="flex flex-col items-center gap-[3px]">
          <Text
            role="status"
            aria-live="polite"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            className="leading-[normal] text-text-panel-title"
          >
            {activeIndex + 1} / {slides.length}
          </Text>
          <div role="group" aria-label={strings.slides} className="flex gap-0.5">
            {slides.map((s, i) => (
              <button
                key={s.alt}
                type="button"
                aria-label={strings.slide(i + 1)}
                aria-pressed={i === activeIndex}
                onClick={() => onActiveIndexChange(i)}
                className="flex h-6 w-[26px] items-center justify-center bg-transparent p-0"
              >
                <span
                  aria-hidden
                  className={['block size-1.5 rounded-full', i === activeIndex ? 'bg-accent' : 'bg-[#60616a]'].join(
                    ' ',
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <button type="button" aria-label={strings.next} onClick={() => move(1)} className={controlButtonClasses}>
          <Text size={FontSize.Title} className="leading-none">
            ›
          </Text>
        </button>
      </div>
    </section>
  )
}
