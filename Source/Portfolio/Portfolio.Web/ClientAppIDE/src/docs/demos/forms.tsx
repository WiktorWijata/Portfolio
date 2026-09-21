import { FontSize, Input, SearchField, Text, TextColor, Textarea } from '@/design-system'
import type { DocEntry } from '../types'

function InputDemo() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-4">
      <Input label="Imię" placeholder="Twoje imię" />
      <Input label="E-mail" type="email" placeholder="ty@firma.pl" />
    </div>
  )
}

function TextareaDemo() {
  return (
    <div className="w-full max-w-[420px]">
      <Textarea
        label="Wiadomość"
        placeholder="Czego dotyczy projekt lub propozycja współpracy?"
        className="h-[140px]"
      />
    </div>
  )
}

function SearchFieldDemo() {
  return (
    <div className="flex w-[200px] flex-col gap-2">
      <Text size={FontSize.XSmall} color={TextColor.Dim}>
        SearchField — border, ikona SVG
      </Text>
      <SearchField placeholder="Szukaj plików…" />
    </div>
  )
}

export const formEntries: DocEntry[] = [
  {
    id: 'input',
    api: { folder: 'Input', interfaces: ['InputProps'] },
    usage: `import { Input } from './design-system'

<Input
  label="Imię"
  placeholder="Twoje imię"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
    name: 'Input',
    category: 'forms',
    summary: 'Jednoliniowe pole tekstowe z etykietą.',
    preview: <Input placeholder="Twoje imię" aria-label="Podgląd pola" />,
    Demo: InputDemo,
  },
  {
    id: 'textarea',
    api: { folder: 'Textarea', interfaces: ['TextareaProps'] },
    usage: `import { Textarea } from './design-system'

<Textarea
  label="Wiadomość"
  placeholder="Czego dotyczy projekt lub propozycja współpracy?"
  maxLength={5000}
  className="h-[140px]"
/>`,
    name: 'Textarea',
    category: 'forms',
    summary: 'Wieloliniowe pole tekstowe z etykietą i zmianą wysokości.',
    preview: <Textarea placeholder="Wiadomość…" aria-label="Podgląd pola" className="h-[64px]" />,
    Demo: TextareaDemo,
  },
  {
    id: 'searchfield',
    api: { folder: 'SearchField', interfaces: ['SearchFieldProps'] },
    usage: `import { SearchField } from './design-system'

<SearchField
  placeholder="Szukaj plików…"
  aria-label="Szukaj plików w rozwiązaniu"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>`,
    name: 'SearchField',
    category: 'forms',
    summary: 'Pole wyszukiwania z ikoną i obramowaniem.',
    note: '.solution-search (Solution Explorer). Szukajka Stack jest prywatną częścią List.',
    preview: <SearchField placeholder="Szukaj plików…" aria-label="Podgląd wyszukiwarki" className="w-full" />,
    Demo: SearchFieldDemo,
  },
]
