import {
  Button,
  ButtonVariant,
  DESIGN_SYSTEM_VERSION,
  FontFamily,
  FontSize,
  FontWeight,
  Card,
  CardField,
  CardFields,
  Label,
  LabelTone,
  Panel,
  Text,
  TextColor,
  readThemeColor,
} from '@/design-system'
import { useTexts } from '@/i18n/hooks/useTexts'
import { DOCS_KEYS } from './Docs.keys'
import { categories, entries } from './registry'
import { navigate } from './useHashRoute'

const PRINCIPLES = ['colors', 'tokens', 'fidelity'] as const

const palette = [
  'accent',
  'accent-light',
  'surface-editor',
  'surface-panel',
  'surface-card',
  'line-emphasis',
  'content-strong',
  'content-body',
  'content-muted',
]

export function OverviewPage() {
  const [text] = useTexts(DOCS_KEYS, 'docs')
  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-4">
        <Label tone={LabelTone.Accent}>{text.overview.kicker}</Label>
        <Text
          as="h1"
          size={FontSize.Display}
          color={TextColor.Heading}
          className="max-w-[760px] leading-[1.1] tracking-[-.03em]"
        >
          {text.overview.title}
        </Text>
        <Text as="p" size={FontSize.XXLarge} color={TextColor.Muted} className="max-w-[640px] leading-[1.7]">
          {text.overview.text}
        </Text>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button variant={ButtonVariant.Primary} onClick={() => navigate('/components')}>
            {text.overview.browse}
          </Button>
          <Button variant={ButtonVariant.Outline} onClick={() => navigate('/changelog')}>
            {text.overview.seeChangelog}
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {[
          { value: entries.length, label: text.overview.stats.components },
          { value: categories.length, label: text.overview.stats.categories },
          { value: palette.length, label: text.overview.stats.colors },
        ].map((stat) => (
          <Panel key={stat.label} className="flex flex-col gap-1 px-5 py-4">
            <Text size={FontSize.Heading} weight={FontWeight.Medium} color={TextColor.Accent} className="leading-none">
              {stat.value}
            </Text>
            <Text size={FontSize.Medium} font={FontFamily.Mono} color={TextColor.Dim}>
              {stat.label}
            </Text>
          </Panel>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          {text.overview.principlesTitle}
        </Text>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {PRINCIPLES.map((key) => (
            <Panel key={key} className="flex flex-col gap-2 p-5">
              <Text as="h3" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
                {text.overview.principles[key].title}
              </Text>
              <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="leading-[1.65]">
                {text.overview.principles[key].body}
              </Text>
            </Panel>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          {text.overview.colorsTitle}
        </Text>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
          {palette.map((name) => (
            <div key={name} className="overflow-hidden rounded-xl border border-line-emphasis bg-surface-card">
              <div className="h-16 border-b border-line-emphasis" style={{ background: `var(--color-${name})` }} />
              <div className="flex flex-col gap-0.5 px-3 py-2.5">
                <Text size={FontSize.Small} color={TextColor.Body}>
                  {name}
                </Text>
                <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint}>
                  {readThemeColor(name)}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <div className="flex flex-col gap-4">
          <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
            {text.overview.typographyTitle}
          </Text>
          <Panel className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-1">
              <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint}>
                Sans — IBM Plex Sans
              </Text>
              <Text size={FontSize.Title} font={FontFamily.Sans} color={TextColor.Heading}>
                Wiktor Wijata — .NET Developer
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint}>
                Mono — JetBrains Mono
              </Text>
              <Text size={FontSize.Title} font={FontFamily.Mono} color={TextColor.Heading}>
                Wiktor Wijata — .NET Developer
              </Text>
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-4">
          <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
            {text.overview.stackTitle}
          </Text>
          <Card title="OrchIDE UI">
            <CardFields>
              <CardField label={text.overview.fields.version}>v{DESIGN_SYSTEM_VERSION}</CardField>
              <CardField label={text.overview.fields.framework}>React 19 + TypeScript</CardField>
              <CardField label={text.overview.fields.style}>Tailwind CSS v4 (@theme)</CardField>
              <CardField label={text.overview.fields.icons}>Lucide</CardField>
              <CardField label={text.overview.fields.fonts}>IBM Plex Sans, JetBrains Mono</CardField>
            </CardFields>
          </Card>
        </div>
      </section>
    </div>
  )
}
