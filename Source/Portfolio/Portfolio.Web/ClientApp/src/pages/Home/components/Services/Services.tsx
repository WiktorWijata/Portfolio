import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { HOME_SERVICES, HOME_SERVICES_TITLE } from '../../Home.consts'

/** "W czym mogę pomóc": four services in two columns, pinned toward the bottom of the intro column. */
export function Services() {
  return (
    <section
      aria-label={HOME_SERVICES_TITLE}
      className="mt-auto mb-auto translate-y-[15px] border-t border-line-default pt-5 max-[1000px]:mt-[30px] max-[1000px]:mb-0 max-[1000px]:translate-y-0"
    >
      <Text
        as="h2"
        size={FontSize.XLarge}
        font={FontFamily.Sans}
        weight={FontWeight.Medium}
        className="mb-[18px] leading-tight tracking-[-.3px] text-content-primary"
      >
        {HOME_SERVICES_TITLE}
      </Text>
      <div className="grid grid-cols-2 gap-x-5 gap-y-[22px] max-[600px]:grid-cols-1 max-[600px]:gap-y-[18px]">
        {HOME_SERVICES.map((service) => (
          <div key={service.title} className="grid grid-cols-[18px_minmax(0,1fr)] items-start gap-[9px]">
            <span aria-hidden className="mt-0.5 text-accent [&_svg]:size-4">
              {service.icon}
            </span>
            <div>
              <Text
                as="h3"
                size={FontSize.Medium}
                font={FontFamily.Sans}
                weight={FontWeight.Medium}
                className="mb-1.5 leading-[1.4] text-content-emphasis"
              >
                {service.title}
              </Text>
              <Text
                as="p"
                size={FontSize.Small}
                font={FontFamily.Sans}
                className="leading-[1.65] text-content-tertiary"
              >
                {service.text}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
