import { Badge, FontFamily, FontSize, FontWeight, Label, LabelTone, Panel, Text, TextColor } from '@/design-system'
import { categories, entries, entriesIn } from './registry'
import type { DocEntry } from './types'

function ComponentCard({ entry }: { entry: DocEntry }) {
  return (
    <a href={`#/components/${entry.id}`} className="block rounded-3xl focus-ring">
      <Panel interactive className="flex h-full flex-col overflow-hidden">
        <div
          inert
          className="pointer-events-none flex h-[132px] items-center justify-center overflow-hidden border-b border-line-emphasis bg-surface-editor p-4"
        >
          {entry.preview}
        </div>
        <div className="flex flex-col gap-1.5 px-4 py-3.5">
          <Text as="h3" size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
            {entry.name}
          </Text>
          <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="leading-[1.55]">
            {entry.summary}
          </Text>
        </div>
      </Panel>
    </a>
  )
}

export function ComponentsIndex() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Label tone={LabelTone.Accent}>OrchIDE UI / Komponenty</Label>
        <Text as="h1" size={FontSize.Heading} color={TextColor.Heading} className="leading-[1.15] tracking-[-.03em]">
          Komponenty
        </Text>
        <Text as="p" size={FontSize.XLarge} color={TextColor.Muted} className="max-w-[640px] leading-[1.7]">
          Biblioteka komponentów portfolio w stylu IDE. Wybierz komponent, żeby zobaczyć żywe demo — cały interfejs jest
          zbudowany wyłącznie z tych klocków.
        </Text>
        <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.Faint}>
          {entries.length} komponentów · {categories.length} kategorii
        </Text>
      </div>

      {categories.map((category) => {
        const items = entriesIn(category.id)
        return (
          <section key={category.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-line-subtle pb-3">
              <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
                {category.label}
              </Text>
              <Badge>{items.length}</Badge>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
              {items.map((entry) => (
                <ComponentCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
