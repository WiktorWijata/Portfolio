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
} from '@/design-system'
import { categories, entries } from './registry'
import { navigate } from './useHashRoute'

const principles = [
  {
    title: 'Jeden, stały motyw',
    body: 'Ciemny motyw w stylu IDE z akcentem orchidei. Tokeny żyją w @theme Tailwinda, bez przełączania motywów w czasie działania.',
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
  { name: 'accent', hex: '#c77dbb' },
  { name: 'accent-light', hex: '#dba8d2' },
  { name: 'editor', hex: '#1e1f22' },
  { name: 'list', hex: '#222428' },
  { name: 'card', hex: '#27282d' },
  { name: 'border-5', hex: '#46424c' },
  { name: 'text', hex: '#e6e7e9' },
  { name: 'text-body', hex: '#bcbec4' },
  { name: 'text-dim', hex: '#8b8f96' },
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
          {palette.map((c) => (
            <div key={c.name} className="overflow-hidden rounded-xl border border-border-5 bg-card">
              <div className="h-16 border-b border-border-5" style={{ background: c.hex }} />
              <div className="flex flex-col gap-0.5 px-3 py-2.5">
                <Text size={FontSize.Small} color={TextColor.Body}>
                  {c.name}
                </Text>
                <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint}>
                  {c.hex}
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
