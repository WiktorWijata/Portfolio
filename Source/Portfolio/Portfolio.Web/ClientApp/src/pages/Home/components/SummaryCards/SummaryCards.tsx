import { useCertificates, useExperiences } from '@/api'
import { Chip, ChipVariant, DataCard, DataCardAction, DataCardList, DataCardRow } from '@/design-system'
import { useEditor } from '@/context'
import { PageId } from '@/navigation'
import {
  HOME_CAREER_ACTION,
  HOME_CAREER_TITLE,
  HOME_CERTIFICATES_TITLE,
  HOME_TECH,
  HOME_TECH_ACTION,
  HOME_TECH_TITLE,
} from '../../Home.consts'
import { toCareerItems } from './SummaryCards.helpers'

const CAREER_ITEMS_SHOWN = 3

/** Career path + certificates side by side, and the key technologies below. */
export function SummaryCards() {
  const { openPage } = useEditor()
  const { data: experiences } = useExperiences()
  const { data: certificates } = useCertificates()

  if (!experiences || !certificates) return null

  return (
    <>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        <DataCard
          title={HOME_CAREER_TITLE}
          action={<DataCardAction onClick={() => openPage(PageId.Experience)}>{HOME_CAREER_ACTION}</DataCardAction>}
        >
          <DataCardList>
            {toCareerItems(experiences, CAREER_ITEMS_SHOWN).map((item) => (
              <DataCardRow key={item.period} title={item.title} subtitle={item.company} tag={item.period} />
            ))}
          </DataCardList>
        </DataCard>
        <DataCard title={HOME_CERTIFICATES_TITLE}>
          <DataCardList>
            {certificates.map((certificate) => (
              <DataCardRow key={certificate.name} title={certificate.name ?? ''} tag={certificate.issuer ?? ''} />
            ))}
          </DataCardList>
        </DataCard>
      </div>
      <DataCard
        className="mt-4"
        title={HOME_TECH_TITLE}
        action={<DataCardAction onClick={() => openPage(PageId.Stack)}>{HOME_TECH_ACTION}</DataCardAction>}
      >
        <div className="flex flex-wrap gap-2 p-3.5">
          {HOME_TECH.map((tech) => (
            <Chip key={tech} variant={ChipVariant.Mono}>
              {tech}
            </Chip>
          ))}
        </div>
      </DataCard>
    </>
  )
}
