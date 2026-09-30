import { Fragment } from 'react'
import { FontFamily, FontSize, FontWeight, Text } from '../Text'
import type { ArchitectureBlock, ArchitectureDiagramProps } from './ArchitectureDiagram.types'

const layerClasses =
  'break-words rounded-sm border border-line-strongest bg-surface-hover p-2.5 text-center leading-[normal] text-content-emphasis [overflow-wrap:anywhere]'
const moduleClasses =
  'break-words rounded-sm border border-accent-line-strong bg-accent-surface p-2.5 text-center leading-[normal] text-accent-soft [overflow-wrap:anywhere]'
const ARROW = '↓'

function BlockNote({ children }: { children: string }) {
  return (
    <Text
      as="small"
      size={FontSize.XSmall}
      font={FontFamily.Sans}
      weight={FontWeight.Normal}
      className="mt-[5px] block leading-[1.5] text-content-tertiary"
    >
      {children}
    </Text>
  )
}

/**
 * Vertical layer diagram: stacked blocks joined by arrows. A block with `children` is drawn as a row of
 * highlighted tiles (modules); other blocks are single layers with an optional link icon.
 */
export function ArchitectureDiagram({ blocks, linkIcon, className = '', ...rest }: ArchitectureDiagramProps) {
  return (
    <div
      role="img"
      className={['grid gap-2 rounded-lg border border-line-default bg-surface-inset p-4', className].join(' ')}
      {...rest}
    >
      {blocks.map((block, index) => (
        <Fragment key={block.title}>
          {index > 0 && (
            <Text
              as="div"
              size={FontSize.XSmall}
              font={FontFamily.Sans}
              className="text-center leading-[1.5] text-accent"
            >
              {block.connectionLabel ? `${ARROW} ${block.connectionLabel}` : ARROW}
            </Text>
          )}
          {block.children?.length ? (
            <ModuleRow modules={block.children} />
          ) : (
            <Layer block={block} linkIcon={linkIcon} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

function ModuleRow({ modules }: { modules: ArchitectureBlock[] }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${modules.length}, minmax(0, 1fr))` }}>
      {modules.map((module) => (
        <Text
          key={module.title}
          as="div"
          size={FontSize.Small}
          font={FontFamily.Mono}
          weight={FontWeight.Medium}
          className={moduleClasses}
        >
          {module.title}
          {module.note && <BlockNote>{module.note}</BlockNote>}
        </Text>
      ))}
    </div>
  )
}

function Layer({ block, linkIcon }: Pick<ArchitectureDiagramProps, 'linkIcon'> & { block: ArchitectureBlock }) {
  return (
    <Text as="div" size={FontSize.Small} font={FontFamily.Mono} weight={FontWeight.Medium} className={layerClasses}>
      {block.href ? (
        <span className="inline-flex items-center gap-2">
          {block.title}
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={block.linkLabel}
            title={block.linkLabel}
            className="inline-flex size-[26px] items-center justify-center rounded-sm align-middle text-content-secondary focus-ring transition-colors duration-150 hover:bg-accent/[.094] hover:text-link-hover"
          >
            {linkIcon}
          </a>
        </span>
      ) : (
        block.title
      )}
      {block.note && <BlockNote>{block.note}</BlockNote>}
    </Text>
  )
}
