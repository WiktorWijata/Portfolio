import { Button, ButtonSize, Chip, ChipVariant, FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import {
  GOAL_ACTIONS,
  GOAL_HEADING,
  GOAL_INTRO_TEXT,
  GOAL_INTRO_TITLE,
  GOAL_SOLUTION_TEXT,
  GOAL_SOLUTION_TITLE,
  GOAL_STACK,
  GOAL_STACK_TITLE,
} from '../../ProjectPortfolio.consts'
import { GithubIcon } from '../GithubIcon'

const sectionTitleClasses = 'uppercase tracking-[.09em] text-[#d7bfd3]'

/** "O projekcie / założenia": the goal of the project, the solution, the technologies and the repository link. */
export function GoalCard() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border-5 bg-[linear-gradient(135deg,#302a33_0%,#27282d_55%)] shadow-[0_16px_48px_rgba(0,0,0,.22)] max-[1100px]:flex-none">
      <div className="flex items-center gap-2.5 border-b border-b-white/5 px-5 py-3">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
          className="size-[15px] shrink-0 text-accent"
        >
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3m10 7h-3M12 22v-3M2 12h3" />
        </svg>
        <Text
          size={FontSize.XSmall}
          font={FontFamily.Mono}
          weight={FontWeight.Medium}
          className="leading-[normal] tracking-[.07em] text-text-panel-title"
        >
          {GOAL_HEADING}
        </Text>
      </div>

      <div className="flex flex-1 flex-col gap-[26px] p-[clamp(22px,3vw,36px)]">
        <section className="relative rounded-xl border border-[rgba(199,125,187,.19)] bg-[linear-gradient(120deg,rgba(199,125,187,.07),rgba(199,125,187,.016))] p-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,.016)]">
          <Text
            as="h3"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className={`mb-4 flex items-center gap-[9px] ${sectionTitleClasses} leading-[1.6]`}
          >
            <span
              aria-hidden
              className="size-4 shrink-0 rounded-full border border-accent [background:radial-gradient(circle,#c77dbb_0,#c77dbb_2px,transparent_2.5px,transparent_5px,rgba(199,125,187,.5)_5.5px,rgba(199,125,187,.5)_6px,transparent_6.5px)]"
            />
            {GOAL_INTRO_TITLE}
          </Text>
          <Text as="p" font={FontFamily.Sans} className="text-[16px] leading-[1.7] text-[#ece8ed]">
            {GOAL_INTRO_TEXT}
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
            {GOAL_SOLUTION_TITLE}
          </Text>
          <Text
            as="p"
            size={FontSize.Large}
            font={FontFamily.Sans}
            className="max-w-[65ch] leading-[1.8] text-[#aeb0bb]"
          >
            {GOAL_SOLUTION_TEXT}
          </Text>
        </section>

        <div className="mt-auto border-t border-t-white/[.063] pt-[22px]">
          <Text
            as="h3"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            weight={FontWeight.Medium}
            className={`mb-3 leading-[normal] ${sectionTitleClasses}`}
          >
            {GOAL_STACK_TITLE}
          </Text>
          <div className="mb-6 flex flex-wrap gap-[7px]">
            {GOAL_STACK.map((technology) => (
              <Chip key={technology} variant={ChipVariant.Tech}>
                {technology}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {GOAL_ACTIONS.map((action) => (
              <Button key={action.href} href={action.href} target="_blank" rel="noopener" size={ButtonSize.Card}>
                <span className="inline-flex items-center gap-2">
                  <GithubIcon />
                  {action.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
