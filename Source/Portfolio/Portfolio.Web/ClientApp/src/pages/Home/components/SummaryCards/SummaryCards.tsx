import { useCertificates, useExperiences } from '@/api'
import { Chip, ChipVariant, Card, CardAction, CardList, CardRow } from '@/design-system'
import { useEditor } from '@/context'
import { PageId } from '@/navigation'
import { HOME_TECH } from '../../Home.consts'
import { toCareerItems } from './SummaryCards.helpers'
import { HOME_KEYS } from '../../Home.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

const CAREER_ITEMS_SHOWN = 3

/** Career path + certificates side by side, and the key technologies below. */
export function SummaryCards() {
  const [text, t] = useTexts(HOME_KEYS)
  const { openPage } = useEditor()
  const { data: experiences } = useExperiences()
  const { data: certificates } = useCertificates()

  if (!experiences || !certificates) return null

  return (
    <>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        <Card
          title={text.career.title}
          action={<CardAction onClick={() => openPage(PageId.Experience)}>{text.career.action}</CardAction>}
        >
          <CardList>
            {toCareerItems(experiences, CAREER_ITEMS_SHOWN, t).map((item) => (
              <CardRow key={item.period} title={item.title} subtitle={item.company} tag={item.period} />
            ))}
          </CardList>
        </Card>
        <Card title={text.certificates.title}>
          <CardList>
            {certificates.map((certificate) => (
              <CardRow key={certificate.name} title={certificate.name ?? ''} tag={certificate.issuer ?? ''} />
            ))}
          </CardList>
        </Card>
      </div>
      <Card
        className="mt-4"
        title={text.tech.title}
        action={<CardAction onClick={() => openPage(PageId.Stack)}>{text.tech.action}</CardAction>}
      >
        <div className="flex flex-wrap gap-2 p-3.5">
          {HOME_TECH.map((tech) => (
            <Chip key={tech} variant={ChipVariant.Mono}>
              {tech}
            </Chip>
          ))}
        </div>
      </Card>
    </>
  )
}
