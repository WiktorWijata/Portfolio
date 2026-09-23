import { Chip, ChipVariant, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import type { PositionDetailProps } from './PositionDetail.types'

/** Right column of the Experience page: the position's heading, its areas of responsibility and technologies. */
export function PositionDetail({ position }: PositionDetailProps) {
  return (
    <article>
      <header className="border-b border-b-line-default pb-4">
        <div className="font-mono text-[13px] leading-[normal]">
          <Text size={FontSize.XSmall} className="leading-[normal] tracking-[.05em] text-content-subtle">
            {position.period}
          </Text>
        </div>
        <Text
          as="h3"
          font={FontFamily.Sans}
          weight={FontWeight.SemiBold}
          className="mt-1.5 mb-0.5 text-[22px] leading-[normal] tracking-[-.01em] text-content-strong"
        >
          {position.role}
        </Text>
        <Text as="p" size={FontSize.SmallPlus} font={FontFamily.Mono} className="leading-[1.8] text-accent">
          {position.company}
        </Text>
      </header>

      {position.groups.map((group) => (
        <section
          key={group.title}
          className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 border-b border-b-line-faint py-3.5 max-[700px]:grid-cols-1 max-[700px]:gap-1.5 @max-[560px]:grid-cols-1 @max-[560px]:gap-1.5"
        >
          <Text
            as="h4"
            size={FontSize.XXSmall}
            font={FontFamily.Mono}
            weight={FontWeight.SemiBold}
            className="mt-0.5 leading-[normal] tracking-[.1em] text-content-faint uppercase"
          >
            {group.title}
          </Text>
          <ul className="m-0 flex list-none flex-col gap-[7px] p-0">
            {group.items.map((item) => (
              <li key={item} className="relative pl-4">
                <span aria-hidden className="absolute left-0 text-content-faint">
                  –
                </span>
                <Text
                  as="p"
                  font={FontFamily.Sans}
                  className="text-[13.5px] leading-[1.6] [text-wrap:pretty] text-content-secondary"
                >
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="flex flex-wrap gap-[7px] pt-[18px]">
        {position.technologies.map((technology) => (
          <Chip key={technology} variant={ChipVariant.Position}>
            {technology}
          </Chip>
        ))}
      </div>
    </article>
  )
}
