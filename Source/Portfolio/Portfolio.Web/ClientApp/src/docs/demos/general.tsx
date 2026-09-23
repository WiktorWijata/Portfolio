import { useState } from 'react'
import {
  Terminal as TerminalIcon,
  MessageSquare,
  Search,
  User,
  FolderKanban,
  Route,
  Layers,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  Button,
  ButtonVariant,
  FontFamily,
  FontSize,
  FontWeight,
  ButtonSize,
  IconButton,
  ToolbarButton,
  Label,
  LabelTone,
  Link,
  LinkTone,
  RailButton,
  Text,
  TextColor,
} from '@/design-system'
import type { DocEntry } from '../types'

const railItems = [
  { id: 'home', icon: <User />, label: 'ABOUT', ariaLabel: 'O mnie' },
  { id: 'projects', icon: <FolderKanban />, label: 'WORK', ariaLabel: 'Projekty' },
  { id: 'skills', icon: <Layers />, label: 'STACK', ariaLabel: 'Stack technologiczny' },
  { id: 'experience', icon: <Route />, label: 'PATH', ariaLabel: 'Doświadczenie' },
  { id: 'contact', icon: <Mail />, label: 'MAIL', ariaLabel: 'Kontakt' },
]

function TextDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      {Object.entries(FontSize).map(([name, size]) => (
        <div key={size} className="flex items-baseline gap-4">
          <Text size={FontSize.XSmall} color={TextColor.Faint} font={FontFamily.Mono} className="w-20 shrink-0">
            {name}
          </Text>
          <Text size={size} color={TextColor.Heading}>
            Wiktor Wijata — .NET Developer
          </Text>
        </div>
      ))}
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
        {Object.entries(TextColor).map(([name, color]) => (
          <Text key={color} size={FontSize.Large} color={color}>
            {name}
          </Text>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <Text size={FontSize.Large} font={FontFamily.Sans} color={TextColor.Body}>
          Sans — IBM Plex Sans
        </Text>
        <Text size={FontSize.Large} font={FontFamily.Mono} color={TextColor.Body}>
          Mono — JetBrains Mono
        </Text>
      </div>
    </div>
  )
}

function LabelDemo() {
  return (
    <div className="flex flex-col gap-1">
      <Label tone={LabelTone.Accent}>Stack / Kompetencje</Label>
      <Text size={FontSize.XLarge} color={TextColor.Heading}>
        Kicker nad h1, akcent
      </Text>
    </div>
  )
}

function ButtonDemo() {
  return (
    <>
      <Button variant={ButtonVariant.Primary}>Zobacz projekty</Button>
      <Button variant={ButtonVariant.Outline}>Pobierz CV ↓</Button>
      <Button variant={ButtonVariant.Primary} disabled>
        Disabled
      </Button>
      <Button variant={ButtonVariant.Secondary} href="#/components/button">
        Pobierz CV ↓
      </Button>
      <Button size={ButtonSize.Sm}>Mały (Sm)</Button>
      <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
        Mały outline
      </Button>
      <Button variant={ButtonVariant.Secondary} size={ButtonSize.Xs} href="#/components/button">
        LinkedIn ↗
      </Button>
      <Button size={ButtonSize.Lg}>Wyślij wiadomość ↗</Button>
    </>
  )
}

function LinkDemo() {
  const [clicks, setClicks] = useState(0)
  return (
    <div className="flex flex-col items-start gap-3">
      <Link onClick={() => setClicks((n) => n + 1)}>Zobacz w portfolio → {clicks ? `(${clicks})` : ''}</Link>
      <Link underline size={FontSize.Medium} weight={FontWeight.Medium}>
        Przełącz język / Switch language →
      </Link>
      <Link tone={LinkTone.Info} size={FontSize.Small}>
        Wariant Info →
      </Link>
      <Link href="#/components/link" size={FontSize.Small}>
        Prawdziwy odnośnik (a)
      </Link>
    </div>
  )
}

function ToolbarButtonDemo() {
  return (
    <>
      <ToolbarButton icon={<TerminalIcon />} aria-label="Terminal" />
      <ToolbarButton icon={<MessageSquare />} aria-label="Asystent" active />
      <ToolbarButton icon={<Search />} aria-label="Szukaj" />
    </>
  )
}

function IconButtonDemo() {
  return (
    <>
      <IconButton icon={<ChevronLeft size={16} />} aria-label="Poprzedni" />
      <IconButton icon={<ChevronRight size={16} />} aria-label="Następny" />
    </>
  )
}

function RailButtonDemo() {
  const [active, setActive] = useState('home')
  return (
    <div className="flex items-center gap-[11px]">
      {railItems.map((item) => (
        <RailButton
          key={item.id}
          icon={item.icon}
          label={item.label}
          aria-label={item.ariaLabel}
          active={active === item.id}
          onClick={() => setActive(item.id)}
        />
      ))}
    </div>
  )
}

export const generalEntries: DocEntry[] = [
  {
    id: 'text',
    api: { folder: 'Text', interfaces: ['TextProps'] },
    usage: `import { Text, FontSize, TextColor, FontFamily, FontWeight } from './design-system'

<Text size={FontSize.Large} color={TextColor.Heading} weight={FontWeight.Medium}>
  Wiktor Wijata
</Text>

// Inny znacznik i klasy dla wartości spoza skali
<Text as="h2" size={FontSize.XXLarge} font={FontFamily.Mono} className="tracking-[-.02em]">
  Doświadczenie
</Text>`,
    name: 'Text',
    category: 'general',
    summary: 'Tekst z tokenów: rozmiar, kolor, font i grubość zamiast wartości w px.',
    note: 'Pominięty parametr jest dziedziczony z rodzica. Detale spoza skali (letter-spacing, line-height) idą w className.',
    preview: (
      <Text size={FontSize.Heading} color={TextColor.Heading} font={FontFamily.Sans}>
        Aa
      </Text>
    ),
    Demo: TextDemo,
  },
  {
    id: 'label',
    api: { folder: 'Label', interfaces: ['LabelProps'] },
    usage: `import { Label, LabelTone, LabelSize } from './design-system'

<Label tone={LabelTone.Accent}>Stack / Kompetencje</Label>
<Label size={LabelSize.Sm}>Kategorie</Label>`,
    name: 'Label',
    category: 'general',
    summary: 'Mały, wersalikowy nagłówek: kicker nad tytułem albo pasek panelu.',
    note: 'Kicker nad nagłówkiem (nagłówek panelu z licznikiem — patrz List).',
    preview: <Label tone={LabelTone.Accent}>Stack / Kompetencje</Label>,
    Demo: LabelDemo,
  },
  {
    id: 'button',
    api: { folder: 'Button', interfaces: ['ButtonProps'] },
    usage: `import { Button, ButtonVariant, ButtonSize } from './design-system'

<Button onClick={openProjects}>Zobacz projekty</Button>
<Button variant={ButtonVariant.Outline}>Pobierz CV ↓</Button>
<Button disabled>Wyślij</Button>

// odnośnik wyglądający jak przycisk (z href renderuje <a>)
<Button variant={ButtonVariant.Secondary} href="/cv.pdf" target="_blank">Pobierz CV ↓</Button>

// kompaktowy, do kart i nakładek (np. przewodnik)
<Button variant={ButtonVariant.Outline} size={ButtonSize.Sm} onClick={skip}>Pomiń</Button>

// mały odnośnik (linki społecznościowe) i wysłanie formularza
<Button variant={ButtonVariant.Secondary} size={ButtonSize.Xs} href="https://github.com/…">GitHub ↗</Button>
<Button type="submit" size={ButtonSize.Lg}>Wyślij wiadomość ↗</Button>`,
    name: 'Button',
    category: 'general',
    summary:
      'Przycisk akcji (albo odnośnik wyglądający jak przycisk) w wariantach Primary, Outline i Secondary oraz rozmiarach Md, Sm, Xs i Lg.',
    preview: <Button variant={ButtonVariant.Primary}>Zobacz projekty</Button>,
    Demo: ButtonDemo,
  },
  {
    id: 'toolbarbutton',
    api: { folder: 'ToolbarButton', interfaces: ['ToolbarButtonProps'] },
    usage: `import { ToolbarButton, ToolbarButtonSize } from './design-system'

<ToolbarButton icon={<Terminal />} aria-label="Terminal" active={terminalOpen} onClick={toggleTerminal} />
<ToolbarButton size={ToolbarButtonSize.Sm} icon={<ListTree />} aria-label="Rozwiń wszystkie foldery" />`,
    name: 'ToolbarButton',
    category: 'general',
    summary: 'Przycisk z samą ikoną w dwóch rozmiarach (Md i kompaktowy Sm) — narzędzia pasków (Terminal, Explorer).',
    preview: (
      <div className="flex gap-1">
        <ToolbarButton icon={<TerminalIcon />} aria-label="Terminal" />
        <ToolbarButton icon={<MessageSquare />} aria-label="Asystent" active />
        <ToolbarButton icon={<Search />} aria-label="Szukaj" />
      </div>
    ),
    Demo: ToolbarButtonDemo,
  },
  {
    id: 'iconbutton',
    api: { folder: 'IconButton', interfaces: ['IconButtonProps'] },
    usage: `import { IconButton } from './design-system'

<IconButton icon={<ChevronLeft size={16} />} aria-label="Poprzedni slajd" onClick={showPrevious} />`,
    name: 'IconButton',
    category: 'general',
    summary: 'Przycisk z samą ikoną i obramowaniem — sterowanie w obrębie karty (np. strzałki karuzeli Gallery).',
    preview: (
      <div className="flex gap-1">
        <IconButton icon={<ChevronLeft size={16} />} aria-label="Poprzedni" />
        <IconButton icon={<ChevronRight size={16} />} aria-label="Następny" />
      </div>
    ),
    Demo: IconButtonDemo,
  },
  {
    id: 'railbutton',
    api: { folder: 'RailButton', interfaces: ['RailButtonProps'] },
    usage: `import { RailButton } from './design-system'

<RailButton
  icon={<FolderKanban />}
  label="WORK"
  aria-label="Projekty"
  active={page === 'projects'}
  onClick={() => setPage('projects')}
/>

// Aktywny stan w innym kolorze (np. terminal)
<RailButton icon={<SquareTerminal />} label="TERMINAL" aria-label="Terminal"
  active={terminalOpen} accent={RailButtonAccent.Success} onClick={toggleTerminal} />`,
    name: 'RailButton',
    category: 'general',
    summary: 'Przycisk nawigacji z pionową etykietą, znany z paska po lewej stronie IDE.',
    note: '.rail button[data-go]/[data-skills] — stany active i hover sprawdzone w computed style.',
    preview: (
      <div className="flex gap-2">
        <RailButton icon={<User />} label="ABOUT" aria-label="O mnie" active />
        <RailButton icon={<FolderKanban />} label="WORK" aria-label="Projekty" />
        <RailButton icon={<Mail />} label="MAIL" aria-label="Kontakt" />
      </div>
    ),
    Demo: RailButtonDemo,
  },
  {
    id: 'link',
    api: { folder: 'Link', interfaces: ['LinkProps'] },
    usage: `import { Link, LinkTone, FontSize } from './design-system'

// przycisk akcji w treści (bez href)
<Link onClick={() => openPage('experience')}>Zobacz w portfolio →</Link>

// odnośnik z podkreśleniem
<Link underline size={FontSize.Medium} onClick={switchLanguage}>Przełącz język →</Link>

// niebieski wariant do treści stron
<Link tone={LinkTone.Info} onClick={openHome}>Poznaj mnie →</Link>

// prawdziwy odnośnik (z href renderuje <a>)
<Link href="/cv.pdf" target="_blank" rel="noopener">Pobierz CV ↗</Link>`,
    name: 'Link',
    category: 'general',
    summary: 'Tekstowy odnośnik w kolorze akcentu: link (<a>) albo przycisk akcji w treści.',
    note: '.tour-action, .ai-message button, .explorer-contact-panel button — kolory ujednolicone do jednego tokenu link.',
    preview: <Link>Zobacz w portfolio →</Link>,
    Demo: LinkDemo,
  },
]
