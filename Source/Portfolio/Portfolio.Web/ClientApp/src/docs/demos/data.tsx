import { useState } from 'react'
import { Boxes, Code2, Database, Github, Globe, Server, Target } from 'lucide-react'
import {
  Badge,
  BadgeTone,
  Chip,
  ChipVariant,
  Card,
  CardAction,
  CardField,
  CardFields,
  CardList,
  CardRow,
  CardVariant,
  FontFamily,
  FontSize,
  ArchitectureDiagram,
  Gallery,
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

function CardDemo() {
  const [opened, setOpened] = useState(0)
  return (
    <div className="grid w-full grid-cols-2 gap-4 max-bp700:grid-cols-1">
      <Card
        title="Ścieżka w skrócie"
        action={
          <CardAction onClick={() => setOpened((n) => n + 1)}>
            {opened ? `Otwórz → (${opened})` : 'Otwórz →'}
          </CardAction>
        }
      >
        <CardList>
          <CardRow title=".NET Developer" subtitle="B3 Consulting Poland" tag="2021.11 — obecnie" />
          <CardRow title=".NET Developer" subtitle="LSI Software" tag="2019.01 — 2021.11" />
        </CardList>
      </Card>
      <Card title="Certyfikaty">
        <CardList>
          <CardRow title="Azure Developer Associate" tag="Microsoft" />
          <CardRow title="MCSA: Web Applications" tag="Microsoft" />
        </CardList>
      </Card>
      <Card title="Dane firmy" className="w-[345px]">
        <CardFields>
          <CardField label="Nazwa">Rescuepc Software Wiktor Wijata</CardField>
          <CardField label="NIP">7681831348</CardField>
          <CardField label="Adres">
            ul. Norwida 3 lok. 46
            <br />
            26-300 Opoczno
          </CardField>
        </CardFields>
      </Card>
      <Card variant={CardVariant.Hero} title="O PROJEKCIE / ZAŁOŻENIA" icon={<Target />} className="w-[345px]">
        <Text size={FontSize.Small} color={TextColor.Dim} className="p-3.5">
          Wyróżniona karta: gradientowe tło, mocniejszy cień i ikona przed tytułem.
        </Text>
      </Card>
      <Card variant={CardVariant.Standard} title="NAGŁÓWEK KARTY" className="w-[345px]">
        <Text size={FontSize.Small} color={TextColor.Dim} className="p-3.5">
          Większa karta z lekkim nagłówkiem — treść dowolna.
        </Text>
      </Card>
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

function ArchitectureDiagramDemo() {
  return (
    <ArchitectureDiagram
      aria-label="Architektura projektu"
      className="w-full max-w-[420px]"
      linkIcon={<Github size={16} aria-hidden />}
      blocks={[
        {
          title: 'Portfolio.Web',
          href: 'https://github.com',
          linkLabel: 'Otwórz na GitHubie',
        },
        { title: 'Portfolio.Api', note: 'ASP.NET Core · kontrolery', connectionLabel: 'HTTP / JSON' },
        {
          title: 'Moduły',
          connectionLabel: 'IProfileModule / INotificationsModule',
          children: [
            { title: 'Profile', note: 'Treści portfolio' },
            { title: 'Notifications', note: 'Wiadomości do wysyłki' },
          ],
        },
        { title: 'Persistence', note: 'EF Core · repozytoria' },
      ]}
    />
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
    id: 'architecturediagram',
    api: { folder: 'ArchitectureDiagram', interfaces: ['ArchitectureDiagramProps', 'ArchitectureBlock'] },
    usage: `import { ArchitectureDiagram } from './design-system'

<ArchitectureDiagram
  aria-label="Architektura projektu"
  linkIcon={<Github size={16} />} // dowolna ikona; komponent jej nie dostarcza
  blocks={[
    { title: 'Portfolio.Web', note: 'React · TypeScript', href: repoUrl, linkLabel: 'Otwórz na GitHubie' },
    { title: 'Portfolio.Api', connectionLabel: 'HTTP / JSON' },
    {
      title: 'Moduły',
      children: [{ title: 'Profile' }, { title: 'Notifications' }], // blok z dziećmi = rząd kafelków
    },
  ]}
/>`,
    name: 'ArchitectureDiagram',
    category: 'data',
    preview: (
      <div className="flex w-full flex-col items-center gap-1 text-accent">
        <span className="h-3 w-full rounded-sm border border-line-strongest bg-surface-hover" />
        <span className="text-[10px] leading-none">↓</span>
        <span className="h-3 w-full rounded-sm border border-line-strongest bg-surface-hover" />
      </div>
    ),
    Demo: ArchitectureDiagramDemo,
  },
  {
    id: 'badge',
    api: { folder: 'Badge', interfaces: ['BadgeProps'] },
    usage: `import { Badge, BadgeTone } from './design-system'

<Badge>2019.01 — 2021.11</Badge>
<Badge tone={BadgeTone.Accent}>2021.11 — obecnie</Badge>`,
    name: 'Badge',
    category: 'data',
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
    id: 'card',
    api: {
      folder: 'Card',
      interfaces: [
        'CardProps',
        'CardActionProps',
        'CardListProps',
        'CardRowProps',
        'CardFieldsProps',
        'CardFieldProps',
      ],
    },
    usage: `import { Card, CardAction, CardFields, CardField, CardList, CardRow, CardVariant } from './design-system'

// Compact (domyślny): pasek nagłówka z tytułem, licznikiem i akcją
<Card
  title="Ścieżka w skrócie"
  action={<CardAction onClick={openExperience}>Otwórz →</CardAction>}
>
  <CardList>
    <CardRow title=".NET Developer" subtitle="B3 Consulting Poland" tag="2021.11 — obecnie" />
    <CardRow title=".NET Developer" subtitle="LSI Software" tag="2019.01 — 2021.11" />
  </CardList>
</Card>

// etykieta nad wartością (dawniej InfoCard)
<Card title="Dane firmy">
  <CardFields>
    <CardField label="NIP">7681831348</CardField>
    <CardField label="Adres">
      ul. Norwida 3 lok. 46
      <br />
      26-300 Opoczno
    </CardField>
  </CardFields>
</Card>

// Standard: większa karta z lekkim nagłówkiem, treść dowolna
<Card variant={CardVariant.Standard} title="GALERIA PROJEKTU">
  {/* treść */}
</Card>

// Hero: wyróżniona karta, opcjonalnie z ikoną przed tytułem
<Card variant={CardVariant.Hero} title="O PROJEKCIE" icon={<Target />}>
  {/* treść */}
</Card>`,
    name: 'Card',
    category: 'data',
    preview: (
      <Card title="Certyfikaty" className="w-full">
        <CardList>
          <CardRow title="Azure Developer Associate" tag="Microsoft" />
        </CardList>
      </Card>
    ),
    Demo: CardDemo,
  },
]
