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
import { releases, type Release } from './changelog'

if (import.meta.env.DEV && releases[0]?.version !== DESIGN_SYSTEM_VERSION) {
  console.warn(
    `OrchIDE UI: DESIGN_SYSTEM_VERSION (${DESIGN_SYSTEM_VERSION}) doesn't match the newest changelog entry (${releases[0]?.version}). Update design-system/version.ts and docs/changelog.ts together.`,
  )
}

const groups: { key: 'added' | 'changed' | 'fixed'; label: string }[] = [
  { key: 'added', label: 'Dodano' },
  { key: 'changed', label: 'Zmieniono' },
  { key: 'fixed', label: 'Poprawiono' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
}

function ReleaseCard({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <Panel className="flex flex-col gap-5 p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Badge tone={latest ? BadgeTone.Accent : BadgeTone.Neutral}>v{release.version}</Badge>
        <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          {release.title}
        </Text>
        <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Faint} className="sm:ml-auto">
          {formatDate(release.date)}
        </Text>
      </div>
      {groups.map(({ key, label }) => {
        const items = release[key]
        if (!items?.length) return null
        return (
          <div key={key} className="flex flex-col gap-2">
            <Label tone={key === 'added' ? LabelTone.Accent : LabelTone.Muted}>{label}</Label>
            <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-text-faint">
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
  return (
    <div className="flex max-w-[860px] flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label tone={LabelTone.Accent}>OrchIDE UI / Changelog</Label>
        <Text as="h1" size={FontSize.Heading} color={TextColor.Heading} className="leading-[1.15] tracking-[-.03em]">
          Changelog
        </Text>
        <Text as="p" size={FontSize.XLarge} color={TextColor.Muted} className="leading-[1.7]">
          Historia zmian biblioteki, od najnowszej wersji.
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
