import { FontFamily, FontSize, FontWeight, Label, LabelTone, Text, TextColor } from '@/design-system'

interface TokenGroup {
  title: string
  tokens: { name: string }[]
}

// Every theme file (all but the shared base and utilities) — the default one is the reference for the groups.
const themeSources = import.meta.glob<string>('@/design-system/theme/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const themes = Object.entries(themeSources)
  .map(([path, css]) => ({ name: path.split('/').pop()?.replace('.css', '') ?? '', css }))
  .filter((theme) => theme.name !== 'base' && theme.name !== 'utilities')
  .sort((a, b) => (a.name === 'dark' ? -1 : b.name === 'dark' ? 1 : a.name.localeCompare(b.name)))
const darkCss = themes.find((theme) => theme.name === 'dark')?.css ?? ''

const valuesOf = (css: string) =>
  new Map([...css.matchAll(/^\s*--color-([\w-]+):\s*(.+?);/gm)].map((m) => [m[1] ?? '', (m[2] ?? '').trim()]))
const themeValues = themes.map((theme) => ({ name: theme.name, values: valuesOf(theme.css) }))

// Polish titles of the groups, keyed by the comment above each group in dark.css (unknown ones keep their own title).
const GROUP_TITLES: Record<string, string> = {
  'Surfaces (backgrounds)': 'Powierzchnie (tła)',
  'Lines (borders and separators)': 'Linie (obramowania i separatory)',
  'Content (text and icons)': 'Treść (tekst i ikony)',
  Accent: 'Akcent',
  Links: 'Linki',
  'Tones: success, warning, danger, info': 'Stany: sukces, ostrzeżenie, błąd, informacja',
  'Decoration and file types': 'Dekoracje i typy plików',
  'Translucent overlays: tint = hover wash, highlight = light edge, scrim = shadows':
    'Nakładki półprzezroczyste: tint (najechanie), highlight (jasna krawędź), scrim (cienie)',
}

// The default theme file is the reference: groups come from its comments, tokens from its declarations.
function parseGroups(css: string): TokenGroup[] {
  const groups: TokenGroup[] = []
  for (const line of css.split('\n')) {
    const title = line.match(/^\s*\/\*\s*(.+?)\s*\*\/\s*$/)
    if (title && !line.includes('--'))
      groups.push({ title: GROUP_TITLES[title[1] ?? ''] ?? title[1] ?? '', tokens: [] })
    const token = line.match(/^\s*--color-([\w-]+):\s*(.+?);/)
    if (token) groups[groups.length - 1]?.tokens.push({ name: token[1] ?? '' })
  }
  return groups.filter((g) => g.tokens.length)
}

const groups = parseGroups(darkCss)

const steps = [
  "Skopiuj design-system/theme/light.css do theme/<nazwa>.css, zmień <nazwa> w selektorze :root[data-theme='<nazwa>'] i wartości — nazwy zostaw. Cienie są opcjonalne.",
  'Dodaj nazwę do ThemeName (design-system/theme/theme.ts) i zaimportuj plik w src/index.css.',
  'Uruchom npm run check:theme: skrypt sprawdza, że motyw ma dokładnie te same tokeny co domyślny.',
  'Motyw wybiera się przez useTheme() (albo setTheme) — wybór jest zapamiętany, a skrypt w index.html ustawia go przed pierwszym renderem. Przełącznik to StatusBarSwitch z opcjami z ikonami.',
]

const rules = [
  'Surowe wartości kolorów (zapis szesnastkowy, funkcje rgb i hsl) oraz klasy domyślnej palety Tailwinda są zakazane w kodzie — pilnuje tego ESLint; sama paleta jest wyłączona.',
  'Kolor z przezroczystością to token z modyfikatorem, np. bg-accent/10. Cienie składają się z tokenów scrim i tint, więc motyw definiuje tylko te dwa.',
  'Miejsca, które nie mogą użyć zmiennej CSS (SVG jako data URI, canvas), czytają wartość przez readThemeColor().',
  'data-theme musi być ustawiony na <html>: tokeny pochodne rozwiązują się na tym elemencie.',
]

export function ThemesPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <Label tone={LabelTone.Accent}>OrchIDE UI / Motywy</Label>
        <Text
          as="h1"
          size={FontSize.Display}
          weight={FontWeight.Medium}
          color={TextColor.Heading}
          className="max-w-[720px] leading-[1.1] tracking-[-.02em]"
        >
          Wszystkie kolory pochodzą z motywu.
        </Text>
        <Text size={FontSize.Large} color={TextColor.Body} className="max-w-[720px] leading-[1.6]">
          Motyw to zestaw tokenów kolorów w jednym pliku. Komponenty, strony i docs odwołują się do nich po nazwie (
          {groups.length} grup: powierzchnie, linie, treść, akcent, linki, stany, dekoracje), więc nowy motyw nie wymaga
          zmian w kodzie. Są dwa: dark (domyślny) i light — przełącznik jest w nagłówku tej strony i w pasku statusu
          aplikacji.
        </Text>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="flex flex-col gap-3">
          <Text as="h2" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
            {group.title}
          </Text>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
            {group.tokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center gap-3 rounded-lg border border-line-subtle bg-surface-card px-3 py-2"
              >
                <span
                  aria-hidden
                  className="size-6 shrink-0 rounded-sm border border-line-strongest"
                  style={{ background: `var(--color-${token.name})` }}
                />
                <span className="flex min-w-0 flex-col">
                  <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Primary} className="truncate">
                    {token.name}
                  </Text>
                  <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint} className="truncate">
                    {themeValues.map((theme) => `${theme.name} ${theme.values.get(token.name) ?? '—'}`).join(' · ')}
                  </Text>
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-3">
        <Text as="h2" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          Jak dodać motyw
        </Text>
        <ol className="flex max-w-[760px] list-decimal flex-col gap-2 pl-5 marker:text-content-muted">
          {steps.map((step) => (
            <li key={step}>
              <Text size={FontSize.Medium} color={TextColor.Body} className="leading-[1.6]">
                {step}
              </Text>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <Text as="h2" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          Zasady
        </Text>
        <ul className="flex max-w-[760px] list-disc flex-col gap-2 pl-5 marker:text-content-muted">
          {rules.map((rule) => (
            <li key={rule}>
              <Text size={FontSize.Medium} color={TextColor.Body} className="leading-[1.6]">
                {rule}
              </Text>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
