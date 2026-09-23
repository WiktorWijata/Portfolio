import {
  Button,
  ButtonVariant,
  DESIGN_SYSTEM_VERSION,
  FontFamily,
  FontSize,
  FontWeight,
  InfoCard,
  InfoRow,
  Label,
  LabelTone,
  Panel,
  Text,
  TextColor,
  readThemeColor,
} from '@/design-system'
import { categories, entries } from './registry'
import { navigate } from './useHashRoute'

const principles = [
  {
    title: 'Kolory tylko z motywu',
    body: 'Domyślny jest ciemny motyw w stylu IDE z akcentem orchidei. Kod odwołuje się do tokenów po nazwie, więc kolejny motyw to nowy plik, a nie zmiany w komponentach.',
  },
  {
    title: 'Tokeny zamiast pikseli',
    body: 'Tekst przyjmuje FontSize, TextColor i FontFamily zamiast wartości w px. Wartości spoza skali trafiają do className.',
  },
  {
    title: 'Wierność prototypowi',
    body: 'Style są mierzone na żywym prototypie (computed style), a nie kopiowane z opisu. Każdy komponent ma odnotowane, z czego został zweryfikowany.',
  },
]

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
  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-4">
        <Label tone={LabelTone.Accent}>OrchIDE UI / Overview</Label>
        <Text
          as="h1"
          size={FontSize.Display}
          color={TextColor.Heading}
          className="max-w-[760px] leading-[1.1] tracking-[-.03em]"
        >
          Komponenty portfolio w stylu IDE
        </Text>
        <Text as="p" size={FontSize.XXLarge} color={TextColor.Muted} className="max-w-[640px] leading-[1.7]">
          OrchIDE UI to biblioteka komponentów, z której zbudowane jest całe portfolio, łącznie z tą stroną. Jedna
          paleta, jedna skala typografii i komponenty sprawdzone względem prototypu.
        </Text>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button variant={ButtonVariant.Primary} onClick={() => navigate('/components')}>
            Przeglądaj komponenty
          </Button>
          <Button variant={ButtonVariant.Outline} onClick={() => navigate('/changelog')}>
            Zobacz Changelog
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {[
          { value: entries.length, label: 'komponentów' },
          { value: categories.length, label: 'kategorii' },
          { value: palette.length, label: 'kluczowych kolorów' },
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
          Zasady
        </Text>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {principles.map((p) => (
            <Panel key={p.title} className="flex flex-col gap-2 p-5">
              <Text as="h3" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
                {p.title}
              </Text>
              <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="leading-[1.65]">
                {p.body}
              </Text>
            </Panel>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          Kolory
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
            Typografia
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
            Stos
          </Text>
          <InfoCard header="OrchIDE UI">
            <InfoRow label="Wersja">v{DESIGN_SYSTEM_VERSION}</InfoRow>
            <InfoRow label="Framework">React 19 + TypeScript</InfoRow>
            <InfoRow label="Style">Tailwind CSS v4 (@theme)</InfoRow>
            <InfoRow label="Ikony">Lucide</InfoRow>
            <InfoRow label="Fonty">IBM Plex Sans, JetBrains Mono</InfoRow>
          </InfoCard>
        </div>
      </section>
    </div>
  )
}
