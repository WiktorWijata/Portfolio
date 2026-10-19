import { useId, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { PositionDetail } from '../PositionDetail'
import type { PositionAccordionProps } from './PositionAccordion.types'

/** Phone version of the positions: one row per position that opens its scope in place; one is open at a time. */
export function PositionAccordion({ positions }: PositionAccordionProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(positions[0]?.id ?? null)

  return (
    <div className="overflow-hidden rounded-lg border border-line-default bg-surface-panel">
      {positions.map((position) => {
        const open = position.id === openId
        const panelId = `${baseId}-${position.id}`
        return (
          <div key={position.id} className="border-b border-line-faint last:border-b-0">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : position.id)}
              className={[
                'grid min-h-16 w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2.5 gap-y-1 border-0 px-4 py-3 text-left focus-ring',
                'shadow-[inset_2px_0_0_var(--row-bar)]',
                open ? 'bg-surface-hover [--row-bar:var(--color-accent)]' : 'bg-transparent [--row-bar:transparent]',
              ].join(' ')}
            >
              <Text size={FontSize.XSmall} font={FontFamily.Mono} className="leading-[normal] text-content-muted">
                {position.period}
              </Text>
              <span aria-hidden className="col-start-2 row-span-2 row-start-1 text-content-muted [&_svg]:size-4">
                {open ? <Minus strokeWidth={1.5} /> : <Plus strokeWidth={1.5} />}
              </span>
              <Text
                size={FontSize.Large}
                font={FontFamily.Sans}
                weight={FontWeight.Medium}
                className="leading-[1.35] text-content-primary"
              >
                {position.role}
                <span className="font-normal text-content-muted"> · {position.company}</span>
              </Text>
            </button>
            <div id={panelId} hidden={!open} className="bg-surface-editor px-4 pb-5">
              <PositionDetail position={position} bare />
            </div>
          </div>
        )
      })}
    </div>
  )
}
