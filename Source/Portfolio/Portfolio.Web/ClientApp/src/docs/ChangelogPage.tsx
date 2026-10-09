import {
  Badge,
  BadgeTone,
  DESIGN_SYSTEM_VERSION,
  FontFamily,
  FontSize,
  FontWeight,
  Label,
  LabelTone,
  Panel,
  Text,
  TextColor,
} from '@/design-system'
import { useTexts } from '@/i18n/hooks/useTexts'
import { releases, type Release } from './changelog'
import { DOCS_KEYS } from './Docs.keys'
import { useLocalizedRelease } from './hooks/useLocalizedRelease'

if (import.meta.env.DEV && releases[0]?.version !== DESIGN_SYSTEM_VERSION) {
  console.warn(
    `OrchIDE UI: DESIGN_SYSTEM_VERSION (${DESIGN_SYSTEM_VERSION}) doesn't match the newest changelog entry (${releases[0]?.version}). Update design-system/version.ts and docs/changelog.ts together.`,
  )
}

const GROUPS = ['added', 'changed', 'fixed'] as const

function ReleaseCard({ release: source, latest }: { release: Release; latest: boolean }) {
  const localize = useLocalizedRelease()
  const release = localize(source)
  const [text] = useTexts(DOCS_KEYS, 'docs')
  return (
    <Panel className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Badge tone={latest ? BadgeTone.Accent : BadgeTone.Neutral}>v{release.version}</Badge>
        <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          {release.title}
        </Text>
        <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Faint} className="sm:ml-auto">
          {new Date(release.date).toLocaleDateString(text.changelog.dateLocale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </div>
      {GROUPS.map((key) => {
        const items = release[key]
        if (!items?.length) return null
        return (
          <div key={key} className="flex flex-col gap-2">
            <Label tone={key === 'added' ? LabelTone.Accent : LabelTone.Muted}>{text.changelog[key]}</Label>
            <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-content-faint">
              {items.map((item) => (
                <li key={item}>
                  <Text size={FontSize.Medium} color={TextColor.Body} className="leading-[1.6]">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </Panel>
  )
}

export function ChangelogPage() {
  const [text] = useTexts(DOCS_KEYS, 'docs')
  return (
    <div className="flex max-w-[860px] flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label tone={LabelTone.Accent}>{text.changelog.kicker}</Label>
        <Text as="h1" size={FontSize.Heading} color={TextColor.Heading} className="leading-[1.15] tracking-[-.03em]">
          {text.changelog.title}
        </Text>
        <Text as="p" size={FontSize.XLarge} color={TextColor.Muted} className="leading-[1.7]">
          {text.changelog.text}
        </Text>
      </div>
      <div className="flex flex-col gap-5">
        {releases.map((release, i) => (
          <ReleaseCard key={release.version} release={release} latest={i === 0} />
        ))}
      </div>
    </div>
  )
}
