import { useSpecializations } from '@/api'
import { Chip, ChipVariant, Card, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { HOME_KEYS } from '../../Home.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/** Diagram card "Co buduję / warstwy systemu": each specialization with a tag, a description and technology chips. */
export function ArchitectureCard() {
  const [text] = useTexts(HOME_KEYS)
  const { data: specializations } = useSpecializations()

  if (!specializations) return null

  return (
    <Card title={text.layers.title} aria-label={text.layers.label} className="w-full min-w-0">
      <ol className="m-0 list-none p-0">
        {specializations.map((specialization, index) => (
          <li
            key={specialization.tag}
            className="relative grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-3.5 gap-y-2 border-t border-line-faint px-3.5 py-3 first:border-t-0"
          >
            <Text
              as="span"
              size={FontSize.Micro}
              font={FontFamily.Mono}
              weight={FontWeight.SemiBold}
              className="inline-flex w-11 items-center justify-center rounded-sm border border-line-default bg-surface-hover py-[3px] leading-[normal] tracking-[.08em] text-accent"
            >
              {specialization.tag}
            </Text>
            <div>
              <Text
                size={FontSize.Medium}
                font={FontFamily.Sans}
                className="block leading-[normal] text-content-emphasis"
              >
                {specialization.title}
              </Text>
              <Text
                as="em"
                font={FontFamily.Sans}
                className="mt-0.5 block text-[11.5px] leading-[1.5] text-content-dim not-italic"
              >
                {specialization.subtitle}
              </Text>
            </div>
            <div className="col-start-2 flex flex-wrap gap-1.5">
              {specialization.technologies?.map((technology) => (
                <Chip key={technology.name} variant={ChipVariant.Compact}>
                  {technology.name}
                </Chip>
              ))}
            </div>
            {index < specializations.length - 1 && (
              <span aria-hidden className="absolute bottom-[-1px] left-[35px] h-[13px] w-px bg-line-default" />
            )}
          </li>
        ))}
      </ol>
    </Card>
  )
}
