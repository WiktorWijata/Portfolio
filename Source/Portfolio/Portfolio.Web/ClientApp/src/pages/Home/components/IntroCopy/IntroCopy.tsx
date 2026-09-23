import { Button, ButtonVariant, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { useEditor } from '@/context'
import { PageId } from '@/navigation'
import { CV_URL } from '@/profile'
import {
  HOME_CV_LABEL,
  HOME_KICKER,
  HOME_PROJECTS_LABEL,
  HOME_TEXT,
  HOME_TITLE_ACCENT,
  HOME_TITLE_LEAD,
} from '../../Home.consts'
import { Services } from '../Services'

/** Left column of the intro: kicker, headline, lead, the two actions and the services list. */
export function IntroCopy() {
  const { openPage } = useEditor()

  return (
    <div className="flex min-w-0 flex-col self-stretch">
      <Text size={FontSize.XSmall} font={FontFamily.Mono} className="tracking-[1.2px] text-content-subtle uppercase">
        {HOME_KICKER}
      </Text>
      <div className="mt-[15px]">
        <Text
          as="h1"
          font={FontFamily.Sans}
          weight={FontWeight.Medium}
          className="mt-3 mb-2 text-[43px] leading-[1.04] tracking-[-.03em] text-content-strong max-bp850:text-[36px] max-bp570:text-[39px]"
        >
          {HOME_TITLE_LEAD} <span className="text-accent">{HOME_TITLE_ACCENT}</span>
        </Text>
        <Text as="p" size={FontSize.Medium} font={FontFamily.Sans} className="leading-[1.8] text-content-lead">
          {HOME_TEXT}
        </Text>
        <div className="mt-[21px] flex flex-wrap items-stretch gap-2.5">
          <Button onClick={() => openPage(PageId.Projects)}>{HOME_PROJECTS_LABEL}</Button>
          <Button variant={ButtonVariant.Secondary} href={CV_URL} target="_blank" rel="noopener">
            {HOME_CV_LABEL}
          </Button>
        </div>
      </div>
      <Services />
    </div>
  )
}
