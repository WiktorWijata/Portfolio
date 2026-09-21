import { Chip, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { STACK_COUNT_LABEL, STACK_EMPTY } from '../../Stack.consts'
import { TechIcon } from '../TechIcon'
import type { StackResultsProps } from './StackResults.types'

/** Right column of the Stack page: the number of matches and the groups of technologies as chips. */
export function StackResults({ groups, total }: StackResultsProps) {
  return (
    <div className="@container min-w-0 px-[26px] pt-5 pb-[26px] @max-[700px]:p-5">
      <Text
        as="div"
        size={FontSize.XSmall}
        font={FontFamily.Mono}
        aria-live="polite"
        className="mb-1 border-b border-b-border pb-3.5 leading-[normal] tracking-[.05em] text-text-label"
      >
        {total > 0 ? `${STACK_COUNT_LABEL} ${total}` : STACK_EMPTY}
      </Text>
      <div>
        {groups.map((group) => (
          <section
            key={group.id}
            className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 border-b border-b-bar-subtle py-4 last:border-b-0 last:pb-0 @max-[560px]:grid-cols-1 @max-[560px]:gap-2"
          >
            <Text
              as="h3"
              size={FontSize.XXSmall}
              font={FontFamily.Mono}
              weight={FontWeight.SemiBold}
              className="mt-[3px] leading-[normal] tracking-[.1em] text-text-faint uppercase"
            >
              {group.label}
            </Text>
            <div className="flex flex-wrap gap-2">
              {group.technologies.map((technology) => (
                <Chip
                  key={technology.name}
                  icon={technology.icon && <TechIcon src={technology.icon} monochrome={technology.monochrome} />}
                >
                  {technology.name}
                </Chip>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
