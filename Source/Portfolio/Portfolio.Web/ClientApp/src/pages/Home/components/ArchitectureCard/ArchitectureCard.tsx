import { Chip, ChipVariant, DataCard, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { HOME_LAYERS, HOME_LAYERS_LABEL, HOME_LAYERS_TITLE } from '../../Home.consts'

/** Diagram card "Co buduję / warstwy systemu": five layers, each with a tag, a description and chips. */
export function ArchitectureCard() {
  return (
    <DataCard title={HOME_LAYERS_TITLE} aria-label={HOME_LAYERS_LABEL} className="w-full min-w-0">
      <ol className="m-0 list-none p-0">
        {HOME_LAYERS.map((layer, index) => (
          <li
            key={layer.tag}
            className="relative grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-3.5 gap-y-2 border-t border-line-faint px-3.5 py-3 first:border-t-0"
          >
            <Text
              as="span"
              size={FontSize.Micro}
              font={FontFamily.Mono}
              weight={FontWeight.SemiBold}
              className="inline-flex w-11 items-center justify-center rounded-sm border border-line-default bg-surface-hover py-[3px] leading-[normal] tracking-[.08em] text-accent"
            >
              {layer.tag}
            </Text>
            <div>
              <Text
                size={FontSize.Medium}
                font={FontFamily.Sans}
                className="block leading-[normal] text-content-emphasis"
              >
                {layer.title}
              </Text>
              <Text
                as="em"
                font={FontFamily.Sans}
                className="mt-0.5 block text-[11.5px] leading-[1.5] text-content-dim not-italic"
              >
                {layer.subtitle}
              </Text>
            </div>
            <div className="col-start-2 flex flex-wrap gap-1.5">
              {layer.chips.map((chip) => (
                <Chip key={chip} variant={ChipVariant.Compact}>
                  {chip}
                </Chip>
              ))}
            </div>
            {index < HOME_LAYERS.length - 1 && (
              <span aria-hidden className="absolute bottom-[-1px] left-[35px] h-[13px] w-px bg-line-default" />
            )}
          </li>
        ))}
      </ol>
    </DataCard>
  )
}
