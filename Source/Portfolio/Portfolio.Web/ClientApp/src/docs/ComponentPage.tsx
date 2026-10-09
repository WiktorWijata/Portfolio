import type { ReactNode } from 'react'
import { FontFamily, FontSize, FontWeight, Label, LabelTone, Panel, Text, TextColor } from '@/design-system'
import { useTexts } from '@/i18n/hooks/useTexts'
import { getComponentTokens } from './api/tokens'
import { DOCS_KEYS } from './Docs.keys'
import { entryText } from './Docs.helpers'
import { CodeBlock } from './CodeBlock'
import { PropsTables } from './PropsTable'
import { entries } from './registry'
import { TokensTables } from './TokensTable'
import type { DocEntry } from './types'

function NeighbourLink({ entry, direction }: { entry?: DocEntry; direction: 'prev' | 'next' }) {
  const [text] = useTexts(DOCS_KEYS, 'docs')
  if (!entry) return <span />
  return (
    <a
      href={`#/components/${entry.id}`}
      className={['flex flex-col gap-1 rounded-md focus-ring', direction === 'next' ? 'items-end text-right' : ''].join(
        ' ',
      )}
    >
      <Text size={FontSize.XSmall} font={FontFamily.Mono} color={TextColor.Faint}>
        {direction === 'prev' ? text.componentPage.previous : text.componentPage.next}
      </Text>
      <Text size={FontSize.XLarge} weight={FontWeight.Medium} color={TextColor.Accent}>
        {entry.name}
      </Text>
    </a>
  )
}

function DocSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5 border-b border-line-subtle pb-3">
        <Text as="h2" size={FontSize.XXLarge} weight={FontWeight.Medium} color={TextColor.Heading}>
          {title}
        </Text>
        {description && (
          <Text as="p" size={FontSize.Medium} color={TextColor.Dim} className="max-w-[720px] leading-[1.6]">
            {description}
          </Text>
        )}
      </div>
      {children}
    </section>
  )
}

export function ComponentPage({ entry }: { entry: DocEntry }) {
  const [text] = useTexts(DOCS_KEYS, 'docs')
  const categoryLabel = text.categories[entry.category]
  const index = entries.findIndex((e) => e.id === entry.id)
  const { dependencies } = getComponentTokens(entry.api.folder)
  const dependencyEntries = dependencies
    .map((folder) => entries.find((e) => e.api.folder === folder))
    .filter((e): e is DocEntry => !!e)

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Text size={FontSize.Small} color={TextColor.Dim}>
          <a href="#/components" className="hover:text-content-strong">
            {text.componentPage.breadcrumb}
          </a>{' '}
          / {categoryLabel}
        </Text>
        <Label tone={LabelTone.Accent}>{categoryLabel}</Label>
        <Text as="h1" size={FontSize.Heading} color={TextColor.Heading} className="leading-[1.15] tracking-[-.03em]">
          {entry.name}
        </Text>
        <Text as="p" size={FontSize.XLarge} color={TextColor.Muted} className="max-w-[640px] leading-[1.7]">
          {entryText(text, entry.id).summary}
        </Text>
        {entryText(text, entry.id).note && (
          <Text
            as="p"
            size={FontSize.XSmall}
            font={FontFamily.Mono}
            color={TextColor.Faint}
            className="max-w-[640px] leading-relaxed"
          >
            {entryText(text, entry.id).note}
          </Text>
        )}
      </div>

      <Panel className="flex flex-wrap items-center gap-4 p-6">
        <entry.Demo />
      </Panel>

      <DocSection title={text.componentPage.usage}>
        <CodeBlock code={entry.usage} />
      </DocSection>

      <DocSection title={text.componentPage.props.title} description={text.componentPage.props.description}>
        <PropsTables interfaces={entry.api.interfaces} />
      </DocSection>

      <DocSection title={text.componentPage.tokens.title} description={text.componentPage.tokens.description}>
        <TokensTables folder={entry.api.folder} />
      </DocSection>

      {dependencyEntries.length > 0 && (
        <DocSection title={text.componentPage.builtFrom.title} description={text.componentPage.builtFrom.description}>
          <div className="flex flex-wrap gap-2">
            {dependencyEntries.map((dep) => (
              <a
                key={dep.id}
                href={`#/components/${dep.id}`}
                className="rounded-md border border-line-emphasis bg-surface-card px-3 py-1.5 focus-ring hover:border-accent-dark"
              >
                <Text size={FontSize.Small} font={FontFamily.Mono} color={TextColor.AccentLight}>
                  {dep.name}
                </Text>
              </a>
            ))}
          </div>
        </DocSection>
      )}

      <div className="flex items-center justify-between border-t border-line-subtle pt-6">
        <NeighbourLink entry={entries[index - 1]} direction="prev" />
        <NeighbourLink entry={entries[index + 1]} direction="next" />
      </div>
    </div>
  )
}
