import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import {
  ARCHITECTURE_CAPTION,
  ARCHITECTURE_HEADING,
  ARCHITECTURE_LABEL,
  ARCHITECTURE_NOTES,
  ARCHITECTURE_SOURCE_LABEL,
  ARCHITECTURE_SOURCE_LINK,
} from '../../ProjectPortfolio.consts'
import { ArchitectureDiagram } from '../ArchitectureDiagram'

/** Architecture of the project: the layer diagram, a caption and short notes on the patterns used. */
export function ArchitectureCard() {
  return (
    <aside
      aria-label={ARCHITECTURE_LABEL}
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border-5 bg-card"
    >
      <Text
        as="div"
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        weight={FontWeight.Medium}
        className="border-b border-b-chip-line px-4 py-3 leading-[normal] tracking-[.07em] text-text-panel-title"
      >
        {ARCHITECTURE_HEADING}
      </Text>
      <div className="flex flex-1 flex-col p-[18px]">
        <ArchitectureDiagram />
        <Text as="p" size={FontSize.XSmall} font={FontFamily.Sans} className="mt-3 leading-[1.6] text-text-caption">
          {ARCHITECTURE_CAPTION}
        </Text>
        <dl className="mt-[18px] grid gap-4">
          {ARCHITECTURE_NOTES.map((note) => (
            <div key={note.title}>
              <Text
                as="dt"
                size={FontSize.Medium}
                font={FontFamily.Sans}
                weight={FontWeight.Medium}
                className="mb-[5px] leading-[normal] text-[#d9c5d5]"
              >
                {note.title}
              </Text>
              <Text as="dd" size={FontSize.Small} font={FontFamily.Sans} className="m-0 leading-[1.7] text-[#a9adb5]">
                {note.text}
              </Text>
            </div>
          ))}
        </dl>
        <Text
          as="p"
          size={FontSize.XSmall}
          font={FontFamily.Sans}
          className="mt-auto pt-5 leading-[1.6] text-text-caption"
        >
          {ARCHITECTURE_SOURCE_LABEL}{' '}
          <a
            href={ARCHITECTURE_SOURCE_LINK.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b7a2cb] outline-none hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Text>{ARCHITECTURE_SOURCE_LINK.label}</Text>
          </a>
        </Text>
      </div>
    </aside>
  )
}
