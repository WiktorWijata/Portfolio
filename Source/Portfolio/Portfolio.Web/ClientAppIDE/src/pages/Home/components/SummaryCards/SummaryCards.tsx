import { Chip, ChipVariant, DataCard, DataCardAction, DataCardList, DataCardRow } from '@/design-system'
import { useEditor } from '@/context'
import { PageId } from '@/navigation'
import {
  HOME_CAREER,
  HOME_CAREER_ACTION,
  HOME_CAREER_TITLE,
  HOME_CERTIFICATES,
  HOME_CERTIFICATES_TITLE,
  HOME_TECH,
  HOME_TECH_ACTION,
  HOME_TECH_TITLE,
} from '../../Home.consts'

/** Career path + certificates side by side, and the key technologies below. */
export function SummaryCards() {
  const { openPage } = useEditor()

  return (
    <>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        <DataCard
          title={HOME_CAREER_TITLE}
          action={<DataCardAction onClick={() => openPage(PageId.Experience)}>{HOME_CAREER_ACTION}</DataCardAction>}
        >
          <DataCardList>
            {HOME_CAREER.map((item) => (
              <DataCardRow key={item.period} title={item.title} subtitle={item.company} tag={item.period} />
            ))}
          </DataCardList>
        </DataCard>
        <DataCard title={HOME_CERTIFICATES_TITLE}>
          <DataCardList>
            {HOME_CERTIFICATES.map((certificate) => (
              <DataCardRow key={certificate.name} title={certificate.name} tag={certificate.issuer} />
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
