import { useProjects } from '@/api'
import {
  Button,
  ButtonSize,
  Card,
  CardVariant,
  Chip,
  ChipVariant,
  FontFamily,
  FontSize,
  FontWeight,
  Text,
} from '@/design-system'
import { GithubIcon } from '../GithubIcon'
import { PROJECT_PORTFOLIO_KEYS } from '../../ProjectPortfolio.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

const sectionTitleClasses = 'uppercase tracking-[.09em] text-content-tinted-strong'

/** "O projekcie / założenia": the goal of the project, the solution, the technologies and the repository link. */
export function GoalCard() {
  const [text] = useTexts(PROJECT_PORTFOLIO_KEYS)
  const { data: projects } = useProjects()
  const project = projects?.[0]
  if (!project) return null

  const technologies = project.technologies ?? []

  return (
    <Card
      variant={CardVariant.Hero}
      title={text.goal.heading}
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3m10 7h-3M12 22v-3M2 12h3" />
        </svg>
      }
      className="flex flex-1 flex-col max-[1100px]:flex-none"
    >
      <div className="flex flex-1 flex-col gap-[26px] p-[clamp(22px,3vw,36px)]">
        <section className="relative rounded-xl border border-accent/[.19] bg-accent-wash p-[22px] shadow-inset-highlight">
          <Text
            as="h3"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className={`mb-4 flex items-center gap-[9px] ${sectionTitleClasses} leading-[1.6]`}
          >
            <span aria-hidden className="size-4 shrink-0 rounded-full border border-accent bg-target-mark" />
            {text.goal.intro}
          </Text>
          <Text as="p" font={FontFamily.Sans} className="text-[16px] leading-[1.7] text-content-strong">
            {project.goal}
          </Text>
        </section>

        <section>
          <Text
            as="h3"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className={`mb-3 leading-[normal] ${sectionTitleClasses}`}
          >
            {text.goal.solution}
          </Text>
          <Text
            as="p"
            size={FontSize.Large}
            font={FontFamily.Sans}
            className="max-w-[65ch] leading-[1.8] text-content-secondary"
          >
            {project.solution}
          </Text>
        </section>

        <div className="mt-auto border-t border-t-tint/[.063] pt-[22px]">
          <Text
            as="h3"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className={`mb-3 leading-[normal] ${sectionTitleClasses}`}
          >
            {text.goal.stack}
          </Text>
          <div className="mb-6 flex flex-wrap gap-[7px]">
            {technologies.map((technology) => (
              <Chip key={technology.name} variant={ChipVariant.Tech}>
                {technology.name}
              </Chip>
            ))}
          </div>
          {project.codeUrl && (
            <div className="flex flex-wrap items-center gap-3">
              <Button href={project.codeUrl} target="_blank" rel="noopener" size={ButtonSize.Card}>
                <span className="inline-flex items-center gap-2">
                  <GithubIcon />
                  {text.goal.repository}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
