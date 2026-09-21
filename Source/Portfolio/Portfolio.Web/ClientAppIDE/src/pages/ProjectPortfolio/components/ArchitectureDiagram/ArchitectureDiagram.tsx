import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { ARCHITECTURE_BLOCKS, ARCHITECTURE_DIAGRAM_LABEL } from '../../ProjectPortfolio.consts'
import { ArchitectureBlockKind } from '../../ProjectPortfolio.types'
import { GithubIcon } from '../GithubIcon'

const layerClasses =
  'break-words rounded-sm border border-[#51505a] bg-hover p-2.5 text-center leading-[normal] text-[#d5d2dc] [overflow-wrap:anywhere]'
const domainLayerClasses =
  'break-words rounded-sm border border-[#94678b] bg-launcher-bg p-2.5 text-center leading-[normal] text-[#dfbad7] [overflow-wrap:anywhere]'

function LayerNote({ children }: { children: string }) {
  return (
    <Text
      as="small"
      size={FontSize.XSmall}
      font={FontFamily.Sans}
      weight={FontWeight.Normal}
      className="mt-[5px] block leading-[1.5] text-[#9da1ac]"
    >
      {children}
    </Text>
  )
}

/** Diagram of the system layers: the layers, the arrows between them and the highlighted domain modules. */
export function ArchitectureDiagram() {
  return (
    <div
      role="img"
      aria-label={ARCHITECTURE_DIAGRAM_LABEL}
      className="grid gap-2 rounded-lg border border-chip-line bg-inset p-4"
    >
      {ARCHITECTURE_BLOCKS.map((block) => {
        if (block.kind === ArchitectureBlockKind.Arrow) {
          return (
            <Text
              key={block.text}
              as="div"
              size={FontSize.XSmall}
              font={FontFamily.Sans}
              className="text-center leading-[1.5] text-accent"
            >
              {block.text}
            </Text>
          )
        }
        if (block.kind === ArchitectureBlockKind.Modules) {
          return (
            <div key={block.modules.map((module) => module.title).join()} className="grid grid-cols-2 gap-2">
              {block.modules.map((module) => (
                <Text
                  key={module.title}
                  as="div"
                  size={FontSize.Small}
                  font={FontFamily.Mono}
                  weight={FontWeight.Medium}
                  className={domainLayerClasses}
                >
                  {module.title}
                  <LayerNote>{module.note}</LayerNote>
                </Text>
              ))}
            </div>
          )
        }
        return (
          <Text
            key={block.title}
            as="div"
            size={FontSize.Small}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className={layerClasses}
          >
            {block.href ? (
              <span className="inline-flex items-center gap-2">
                {block.title}
                <a
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={block.linkLabel}
                  title={block.linkLabel}
                  className="inline-flex size-[26px] items-center justify-center rounded-sm align-middle text-[#aaa6b2] transition-colors duration-150 outline-none hover:bg-[rgba(199,125,187,.094)] hover:text-[#e3c2de] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <GithubIcon />
                </a>
              </span>
            ) : (
              block.title
            )}
            <LayerNote>{block.note}</LayerNote>
          </Text>
        )
      })}
    </div>
  )
}
