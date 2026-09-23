import { BookOpen, MessageSquare, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import {
  CardHeading,
  Container,
  ContainerSize,
  FontFamily,
  FontSize,
  List,
  ListItem,
  Panel,
  SplitPanel,
  SplitPanelCollapseAt,
  StatusBar,
  StatusBarAccent,
  StatusBarButton,
  StatusBarDivider,
  StatusBarItem,
  StatusBarSpacer,
  StatusBarSwitch,
  StatusBarTone,
  Text,
  TextColor,
  TitleBar,
  TitleBarButton,
  TitleBarButtonTone,
} from '@/design-system'
import type { DocEntry } from '../types'

function ContainerDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      {Object.entries(ContainerSize).map(([name, size]) => (
        <div key={size} className="rounded-sm border border-dashed border-line-emphasis bg-surface-editor py-3">
          <Container size={size}>
            <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Dim}>
              ContainerSize.{name} — {size === ContainerSize.Wide ? '1280px' : '900px'}, wyśrodkowany, px-8
            </Text>
          </Container>
        </div>
      ))}
    </div>
  )
}

function PanelDemo() {
  return (
    <>
      <Panel className="w-[280px] p-5">
        <Text as="p" size={FontSize.Large} color={TextColor.Body}>
          Panel bazowy — karty, sekcje.
        </Text>
      </Panel>
      <Panel interactive className="w-[280px] p-5">
        <Text as="p" size={FontSize.Large} color={TextColor.Body}>
          Panel interactive — hover mnie.
        </Text>
      </Panel>
    </>
  )
}

function CardHeadingDemo() {
  return (
    <div className="w-[280px] overflow-hidden rounded-md border border-line-default">
      <CardHeading>NAGŁÓWEK KARTY</CardHeading>
      <div className="p-3.5">
        <Text size={FontSize.Small} color={TextColor.Dim}>
          Treść karty, dowolna.
        </Text>
      </div>
    </div>
  )
}

function SplitPanelDemo() {
  const [activeCompany, setActiveCompany] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  return (
    <div className="flex w-full flex-col gap-3">
      <Text size={FontSize.Small} color={TextColor.Dim}>
        Wariant Experience (collapse przy 700px):
      </Text>
      <SplitPanel
        collapseAt={SplitPanelCollapseAt.Bp700}
        aside={
          <List header="Stanowiska" count={4}>
            {['B3 Consulting Poland', 'LSI Software', 'GECOS', 'Moje Bambino'].map((company, i) => (
              <ListItem
                key={company}
                title={company}
                subtitle=".NET Developer"
                active={activeCompany === i}
                onClick={() => setActiveCompany(i)}
                tag="2021.11 — obecnie"
              />
            ))}
          </List>
        }
      >
        <div className="h-full bg-surface-editor p-5">
          <Text as="p" size={FontSize.Large} color={TextColor.Body}>
            Prawa kolumna (.xp-panel) — treść specyficzna dla strony Experience.
          </Text>
        </div>
      </SplitPanel>

      <Text size={FontSize.Small} color={TextColor.Dim} className="mt-2">
        Wariant Stack (collapse przy 820px):
      </Text>
      <SplitPanel
        collapseAt={SplitPanelCollapseAt.Bp820}
        aside={
          <List
            header="Kategorie"
            count={11}
            searchable
            searchProps={{ placeholder: 'Szukaj technologii…', 'aria-label': 'Szukaj technologii' }}
          >
            {['Wszystkie', 'Backend', 'Frontend', 'AI', 'Desktop'].map((category, i) => (
              <ListItem
                key={category}
                title={category}
                active={activeCategory === i}
                onClick={() => setActiveCategory(i)}
              />
            ))}
          </List>
        }
      >
        <div className="h-full bg-surface-editor p-5">
          <Text as="p" size={FontSize.Large} color={TextColor.Body}>
            Prawa kolumna — grupy technologii (.skill-group).
          </Text>
        </div>
      </SplitPanel>
    </div>
  )
}

function StatusBarDemo() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(true)
  const [language, setLanguage] = useState('pl')
  const [demoTheme, setDemoTheme] = useState('dark')
  return (
    <div className="w-full overflow-hidden rounded-sm border border-line-default">
      <StatusBar aria-label="Pasek statusu">
        <StatusBarItem tone={StatusBarTone.Success}>⑂ master</StatusBarItem>
        <StatusBarItem truncate>GetStarted.md</StatusBarItem>
        <StatusBarDivider />
        <StatusBarButton expanded={terminalOpen} onClick={() => setTerminalOpen((open) => !open)}>
          {'>_ Terminal'}
        </StatusBarButton>
        <StatusBarButton
          icon={<MessageSquare strokeWidth={1.5} />}
          expanded={assistantOpen}
          accent={StatusBarAccent.Assistant}
          onClick={() => setAssistantOpen((open) => !open)}
        >
          Asystent
        </StatusBarButton>
        <StatusBarSpacer />
        <StatusBarButton icon={<BookOpen strokeWidth={1.5} />} href="#/components/statusbar">
          OrchIDE UI
        </StatusBarButton>
        <StatusBarSwitch
          aria-label="Motyw"
          value={demoTheme}
          onChange={setDemoTheme}
          options={[
            { value: 'dark', label: 'Ciemny', icon: <Moon strokeWidth={1.5} /> },
            { value: 'light', label: 'Jasny', icon: <Sun strokeWidth={1.5} /> },
          ]}
        />
        <StatusBarSwitch
          aria-label="Język"
          value={language}
          onChange={setLanguage}
          options={[
            { value: 'pl', label: 'PL', 'aria-label': 'Polski' },
            { value: 'en', label: 'EN', 'aria-label': 'English' },
          ]}
        />
        <StatusBarItem tone={StatusBarTone.Faint}>v0.1.0</StatusBarItem>
      </StatusBar>
    </div>
  )
}

function TitleBarDemo() {
  const [clicks, setClicks] = useState(0)
  return (
    <div className="w-full overflow-hidden rounded-sm border border-line-default">
      <TitleBar logo="W_" title="WiktorWijata / Portfolio">
        <TitleBarButton icon="▷" onClick={() => setClicks((n) => n + 1)}>
          {clicks ? `Oprowadź mnie (${clicks})` : 'Oprowadź mnie'}
        </TitleBarButton>
        <TitleBarButton tone={TitleBarButtonTone.Link}>☰ Explorer</TitleBarButton>
      </TitleBar>
    </div>
  )
}

export const layoutEntries: DocEntry[] = [
  {
    id: 'container',
    api: { folder: 'Container', interfaces: ['ContainerProps'] },
    usage: `import { Container, ContainerSize } from './design-system'

<Container className="py-10">Treść strony (max 900 px)</Container>
<Container size={ContainerSize.Wide}>Układ z sidebarem (max 1280 px)</Container>`,
    name: 'Container',
    category: 'layout',
    summary: 'Wyśrodkowany kontener szerokości strony z marginesami bocznymi.',
    preview: (
      <div className="flex h-14 w-full items-center justify-center rounded-sm border border-dashed border-line-emphasis">
        <div className="h-8 w-2/3 rounded-sm bg-surface-hover" />
      </div>
    ),
    Demo: ContainerDemo,
  },
  {
    id: 'panel',
    api: { folder: 'Panel', interfaces: ['PanelProps'] },
    usage: `import { Panel } from './design-system'

<Panel className="p-5">Zwykła karta</Panel>
<Panel interactive className="p-5" onClick={openProject}>
  Klikalna karta projektu
</Panel>`,
    name: 'Panel',
    category: 'layout',
    summary: 'Bazowa karta: tło, obramowanie, promień i cień. Opcjonalnie z hoverem.',
    preview: (
      <Panel className="px-5 py-4">
        <Text size={FontSize.Medium} color={TextColor.Body}>
          Panel bazowy
        </Text>
      </Panel>
    ),
    Demo: PanelDemo,
  },
  {
    id: 'cardheading',
    api: { folder: 'CardHeading', interfaces: ['CardHeadingProps'] },
    usage: `import { CardHeading } from './design-system'

<div className="overflow-hidden rounded-2xl border border-line-emphasis bg-surface-card">
  <CardHeading>GALERIA PROJEKTU</CardHeading>
  {/* treść karty */}
</div>`,
    name: 'CardHeading',
    category: 'layout',
    summary: 'Mała etykieta na górze obramowanej karty, bez tła i bez licznika/akcji.',
    note: 'Gallery i ArchitectureCard (strona projektu) — dwa miejsca z identycznym nagłówkiem karty, teraz jedno źródło. Inna rola niż PanelBar (ma tło, licznik i akcję — DataCard, InfoCard, List).',
    preview: (
      <div className="w-full max-w-[220px] overflow-hidden rounded-md border border-line-default">
        <CardHeading>NAGŁÓWEK</CardHeading>
      </div>
    ),
    Demo: CardHeadingDemo,
  },
  {
    id: 'splitpanel',
    api: { folder: 'SplitPanel', interfaces: ['SplitPanelProps'] },
    usage: `import { SplitPanel, SplitPanelCollapseAt, List, ListItem } from './design-system'

<SplitPanel
  collapseAt={SplitPanelCollapseAt.Bp700}
  aside={
    <List header="Stanowiska" count={2}>
      <ListItem title="LSI Software" subtitle=".NET Developer" active />
      <ListItem title="GECOS" subtitle=".NET Developer" />
    </List>
  }
>
  <div className="p-5">Szczegóły wybranego stanowiska</div>
</SplitPanel>`,
    name: 'SplitPanel',
    category: 'layout',
    summary: 'Master-detail: lista po lewej, szczegóły po prawej, zwija się na wąskich ekranach.',
    note: '.xp w Experience i .stack-panel w Stack mają identyczny grid 320px/1fr, border, radius — sprawdzone w DOM.',
    preview: (
      <div className="grid h-14 w-full grid-cols-[1fr_2fr] overflow-hidden rounded-md border border-line-default">
        <div className="border-r border-line-default bg-surface-panel" />
        <div className="bg-surface-editor" />
      </div>
    ),
    Demo: SplitPanelDemo,
  },
  {
    id: 'statusbar',
    api: {
      folder: 'StatusBar',
      interfaces: [
        'StatusBarProps',
        'StatusBarItemProps',
        'StatusBarButtonProps',
        'StatusBarSwitchProps',
        'StatusBarSwitchOption',
      ],
    },
    usage: `import {
  StatusBar, StatusBarItem, StatusBarButton, StatusBarDivider,
  StatusBarSpacer, StatusBarSwitch, StatusBarTone, StatusBarAccent,
} from './design-system'

<StatusBar aria-label="Pasek statusu">
  <StatusBarItem tone={StatusBarTone.Success}>⑂ master</StatusBarItem>
  <StatusBarItem truncate>{activeFile}</StatusBarItem>
  <StatusBarDivider />
  <StatusBarButton expanded={terminalOpen} onClick={toggleTerminal}>{'>_ Terminal'}</StatusBarButton>
  <StatusBarButton
    icon={<MessageSquare />}
    expanded={chatOpen}
    accent={StatusBarAccent.Assistant}
    onClick={toggleChat}
  >
    Asystent
  </StatusBarButton>
  <StatusBarSpacer />
  {/* z href przycisk jest odnośnikiem <a> */}
  <StatusBarButton icon={<BookOpen />} href="/docs.html" target="_blank" rel="noopener">
    OrchIDE UI
  </StatusBarButton>
  {/* z ikoną podpis jest nazwą dostępną, a nie tekstem */}
  <StatusBarSwitch
    aria-label="Motyw"
    value={theme}
    onChange={setTheme}
    options={[
      { value: 'dark', label: 'Ciemny', icon: <Moon /> },
      { value: 'light', label: 'Jasny', icon: <Sun /> },
    ]}
  />
  <StatusBarSwitch
    aria-label="Język"
    value={language}
    onChange={setLanguage}
    options={[{ value: 'pl', label: 'PL' }, { value: 'en', label: 'EN' }]}
  />
  <StatusBarItem tone={StatusBarTone.Faint}>v0.1.0</StatusBarItem>
</StatusBar>`,
    name: 'StatusBar',
    category: 'layout',
    summary: 'Dolny pasek okna IDE: gałąź, ścieżka pliku, przełączniki paneli, język i wersja.',
    note: '.status w prototypie — wymiary i kolory zmierzone przez getComputedStyle.',
    preview: (
      <div className="flex h-7 w-full items-center gap-3 border-t border-line-default bg-surface-hover px-3">
        <span className="font-mono text-xs text-success-content-muted">⑂ master</span>
        <span className="ml-auto rounded-xs bg-accent-surface px-[5px] py-[3px] font-mono text-2xs text-accent-soft">
          PL
        </span>
      </div>
    ),
    Demo: StatusBarDemo,
  },
  {
    id: 'titlebar',
    api: { folder: 'TitleBar', interfaces: ['TitleBarProps', 'TitleBarButtonProps'] },
    usage: `import { TitleBar, TitleBarButton, TitleBarButtonTone } from './design-system'

<TitleBar logo="W_" title="WiktorWijata / Portfolio">
  <TitleBarButton icon="▷" onClick={startTour}>Oprowadź mnie</TitleBarButton>
  <TitleBarButton tone={TitleBarButtonTone.Link} onClick={toggleExplorer}>☰ Explorer</TitleBarButton>
</TitleBar>`,
    name: 'TitleBar',
    category: 'layout',
    summary: 'Górny pasek okna IDE: logo, tytuł i przyciski akcji.',
    note: '.bar i .bar .run w prototypie — wymiary, kolory i hover zmierzone przez getComputedStyle.',
    preview: (
      <div className="flex h-9 w-full items-center gap-3.5 border-b border-line-default bg-surface-hover px-3">
        <span className="rounded-[2px] bg-accent px-[5px] py-[3px] font-mono text-xs font-semibold text-accent-content">
          W_
        </span>
        <span className="rounded-md border border-info-line bg-info-surface px-2.5 py-1 font-sans text-xs font-medium text-info-content">
          ▷ Oprowadź mnie
        </span>
      </div>
    ),
    Demo: TitleBarDemo,
  },
]
