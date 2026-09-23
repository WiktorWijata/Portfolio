import { useState } from 'react'
import { Boxes, Code2, Database, Globe, Server } from 'lucide-react'
import {
  Badge,
  BadgeTone,
  Chip,
  ChipVariant,
  DataCard,
  DataCardAction,
  DataCardList,
  DataCardRow,
  FontFamily,
  FontSize,
  Gallery,
  InfoCard,
  InfoRow,
  List,
  ListItem,
  ListItemVariant,
  Text,
  TextColor,
} from '@/design-system'
import type { DocEntry } from '../types'

function BadgeDemo() {
  return (
    <>
      <Badge>2019.01 — 2021.11</Badge>
      <Badge tone={BadgeTone.Accent}>2021.11 — obecnie</Badge>
    </>
  )
}

function ChipDemo() {
  return (
    <>
      <Chip icon={<Code2 />}>React</Chip>
      <Chip icon={<Database />}>MSSQL</Chip>
      <Chip icon={<Server />}>.NET Core</Chip>
      <Chip icon={<Globe />}>REST API</Chip>
      <Chip icon={<Boxes />}>Docker</Chip>
      <Chip>TypeScript</Chip>
      <Chip variant={ChipVariant.Mono}>SQL Server</Chip>
      <Chip variant={ChipVariant.Compact}>gRPC</Chip>
      <Chip variant={ChipVariant.Tech}>Kubernetes</Chip>
      <Chip variant={ChipVariant.Position}>MassTransit</Chip>
    </>
  )
}

function DataCardDemo() {
  const [opened, setOpened] = useState(0)
  return (
    <div className="grid w-full grid-cols-2 gap-4 max-bp700:grid-cols-1">
      <DataCard
        title="Ścieżka w skrócie"
        action={
          <DataCardAction onClick={() => setOpened((n) => n + 1)}>
            {opened ? `Otwórz → (${opened})` : 'Otwórz →'}
          </DataCardAction>
        }
      >
        <DataCardList>
          <DataCardRow title=".NET Developer" subtitle="B3 Consulting Poland" tag="2021.11 — obecnie" />
          <DataCardRow title=".NET Developer" subtitle="LSI Software" tag="2019.01 — 2021.11" />
        </DataCardList>
      </DataCard>
      <DataCard title="Certyfikaty">
        <DataCardList>
          <DataCardRow title="Azure Developer Associate" tag="Microsoft" />
          <DataCardRow title="MCSA: Web Applications" tag="Microsoft" />
        </DataCardList>
      </DataCard>
    </div>
  )
}

function ListDemo() {
  const [active, setActive] = useState(0)
  const [category, setCategory] = useState(0)
  return (
    <div className="flex flex-wrap items-start gap-4">
      <List header="Stanowiska" count={3} className="w-[360px] overflow-hidden rounded-md border border-line-default">
        {['B3 Consulting Poland', 'LSI Software', 'GECOS'].map((company, i) => (
          <ListItem
            key={company}
            title={company}
            subtitle=".NET Developer"
            active={active === i}
            onClick={() => setActive(i)}
            tag="2021.11 — obecnie"
          />
        ))}
      </List>
      <List
        header="Kategorie"
        count={3}
        searchable
        searchProps={{ placeholder: 'Szukaj technologii…', 'aria-label': 'Szukaj technologii' }}
        className="w-[260px] overflow-hidden rounded-md border border-line-default"
      >
        {['Wszystkie', 'Backend', 'Frontend'].map((name, i) => (
          <ListItem
            key={name}
            variant={ListItemVariant.Filter}
            title={name}
            active={category === i}
            onClick={() => setCategory(i)}
          />
        ))}
      </List>
    </div>
  )
}

function InfoCardDemo() {
  return (
    <InfoCard header="DANE FIRMY" className="w-[345px]">
      <InfoRow label="Nazwa">Rescuepc Software Wiktor Wijata</InfoRow>
      <InfoRow label="NIP">7681831348</InfoRow>
      <InfoRow label="REGON">385601617</InfoRow>
      <InfoRow label="Adres">
        ul. Norwida 3 lok. 46
        <br />
        26-300 Opoczno
        <br />
        woj. łódzkie
      </InfoRow>
    </InfoCard>
  )
}

function GalleryDemo() {
  const [index, setIndex] = useState(0)
  return (
    <Gallery
      aria-label="Galeria projektu Portfolio"
      className="w-full max-w-[800px]"
      activeIndex={index}
      onActiveIndexChange={setIndex}
      slides={[
        { alt: 'Widok aplikacji — zdjęcie 1' },
        { alt: 'Widok aplikacji — zdjęcie 2' },
        { alt: 'Widok aplikacji — zdjęcie 3' },
      ]}
    />
  )
}

export const dataEntries: DocEntry[] = [
  {
    id: 'badge',
    api: { folder: 'Badge', interfaces: ['BadgeProps'] },
    usage: `import { Badge, BadgeTone } from './design-system'

<Badge>2019.01 — 2021.11</Badge>
<Badge tone={BadgeTone.Accent}>2021.11 — obecnie</Badge>`,
    name: 'Badge',
    category: 'data',
    summary: 'Mała etykieta statusu lub daty, w tonie neutralnym albo akcentowym.',
    preview: (
      <div className="flex gap-2">
        <Badge>2019 — 2021</Badge>
        <Badge tone={BadgeTone.Accent}>obecnie</Badge>
      </div>
    ),
    Demo: BadgeDemo,
  },
  {
    id: 'chip',
    api: { folder: 'Chip', interfaces: ['ChipProps'] },
    usage: `import { Chip, ChipVariant } from './design-system'

<Chip icon={<Code2 />}>React</Chip>
<Chip>TypeScript</Chip>

// mniejsze warianty (strona Home)
<Chip variant={ChipVariant.Mono}>SQL Server</Chip>
<Chip variant={ChipVariant.Compact}>gRPC</Chip>

// znacznik technologii na stronie projektu
<Chip variant={ChipVariant.Tech}>Kubernetes</Chip>

// znacznik technologii w opisie stanowiska (Experience)
<Chip variant={ChipVariant.Position}>MassTransit</Chip>`,
    name: 'Chip',
    category: 'data',
    summary: 'Statyczny znacznik technologii z opcjonalną ikoną, w pięciu wariantach rozmiaru.',
    note: 'Ikony to Lucide na ten etap, docelowo Devicon/Simple Icons w kolorach marek.',
    preview: (
      <div className="flex gap-2">
        <Chip icon={<Code2 />}>React</Chip>
        <Chip>TypeScript</Chip>
      </div>
    ),
    Demo: ChipDemo,
  },
  {
    id: 'list',
    api: { folder: 'List', interfaces: ['ListProps', 'ListItemProps'] },
    usage: `import { List, ListItem, ListItemVariant, Badge } from './design-system'

<List header="Stanowiska" count={2}>
  <ListItem
    title="B3 Consulting Poland"
    subtitle=".NET Developer"
    active
    tag="2021.11 — obecnie"
  />
  <ListItem title="LSI Software" subtitle=".NET Developer" onClick={select} />
</List>

// z wbudowaną wyszukiwarką (jak w Stack)
<List
  header="Kategorie"
  count={2}
  searchable
  searchProps={{ placeholder: 'Szukaj technologii…', 'aria-label': 'Szukaj technologii' }}
>
  <ListItem variant={ListItemVariant.Filter} title="Wszystkie" active />
  <ListItem variant={ListItemVariant.Filter} title="Backend" />
</List>`,
    name: 'List',
    category: 'data',
    summary: 'Lista z nagłówkiem, licznikiem i opcjonalną wyszukiwarką; wiersze z animowanym hoverem.',
    note: 'Wiersz ListItem: po hoverze/aktywacji pojawia się akcentowy pasek, tło jaśnieje i rośnie lewy padding.',
    preview: (
      <div className="w-full overflow-hidden rounded-md border border-line-default">
        <List header="Kategorie" count={3}>
          <ListItem title="Backend" active />
          <ListItem title="Frontend" />
        </List>
      </div>
    ),
    Demo: ListDemo,
  },
  {
    id: 'infocard',
    api: { folder: 'InfoCard', interfaces: ['InfoCardProps', 'InfoRowProps'] },
    usage: `import { InfoCard, InfoRow } from './design-system'

<InfoCard header="DANE FIRMY">
  <InfoRow label="NIP">7681831348</InfoRow>
  <InfoRow label="Adres">
    ul. Norwida 3 lok. 46
    <br />
    26-300 Opoczno
  </InfoRow>
</InfoCard>`,
    name: 'InfoCard',
    category: 'data',
    summary: 'Karta tylko do odczytu: nagłówek i wiersze etykieta/wartość.',
    note: '.contact-company („Dane firmy" na Contact) — ta sama powierzchnia co List, bez interakcji.',
    preview: (
      <InfoCard header="DANE FIRMY" className="w-full">
        <InfoRow label="NIP">7681831348</InfoRow>
      </InfoCard>
    ),
    Demo: InfoCardDemo,
  },
  {
    id: 'gallery',
    api: { folder: 'Gallery', interfaces: ['GalleryProps', 'GalleryLabels', 'GallerySlide'] },
    usage: `import { useState } from 'react'
import { Gallery } from './design-system'

const [index, setIndex] = useState(0)

<Gallery
  aria-label="Galeria projektu Portfolio"
  activeIndex={index}
  onActiveIndexChange={setIndex}
  slides={[
    { src: '/img/home.png', alt: 'Strona główna' },
    { alt: 'Widok aplikacji — zdjęcie 2' }, // bez src: placeholder
  ]}
/>`,
    name: 'Gallery',
    category: 'data',
    summary: 'Karuzela zdjęć projektu z placeholderami, strzałkami, kropkami i obsługą klawiatury.',
    note: '.project-gallery (Portfolio.cs / karta projektu) — sprawdzone w computed style.',
    preview: (
      <div className="flex flex-col items-center gap-1.5">
        <Text size={FontSize.Title} color={TextColor.Accent} font={FontFamily.Mono}>
          ▧
        </Text>
        <div className="flex gap-1">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="size-1.5 rounded-full bg-indicator-idle" />
          <span className="size-1.5 rounded-full bg-indicator-idle" />
        </div>
      </div>
    ),
    Demo: GalleryDemo,
  },
  {
    id: 'datacard',
    api: {
      folder: 'DataCard',
      interfaces: ['DataCardProps', 'DataCardActionProps', 'DataCardListProps', 'DataCardRowProps'],
    },
    usage: `import { DataCard, DataCardAction, DataCardList, DataCardRow } from './design-system'

<DataCard
  title="Ścieżka w skrócie"
  action={<DataCardAction onClick={openExperience}>Otwórz →</DataCardAction>}
>
  <DataCardList>
    <DataCardRow title=".NET Developer" subtitle="B3 Consulting Poland" tag="2021.11 — obecnie" />
    <DataCardRow title=".NET Developer" subtitle="LSI Software" tag="2019.01 — 2021.11" />
  </DataCardList>
</DataCard>

// treść dowolna: np. chipy
<DataCard title="Kluczowe technologie">
  <div className="flex flex-wrap gap-2 p-3.5">
    <Chip variant={ChipVariant.Mono}>C#</Chip>
  </div>
</DataCard>`,
    name: 'DataCard',
    category: 'data',
    summary: 'Karta z paskiem nagłówka (tytuł + akcja) i wierszami z tytułem, podtytułem i plakietką.',
    note: '.home-card, .home-techbar i .arch2 na Home — wymiary, kolory i separatory zmierzone w prototypie.',
    preview: (
      <DataCard title="Certyfikaty" className="w-full">
        <DataCardList>
          <DataCardRow title="Azure Developer Associate" tag="Microsoft" />
        </DataCardList>
      </DataCard>
    ),
    Demo: DataCardDemo,
  },
]
