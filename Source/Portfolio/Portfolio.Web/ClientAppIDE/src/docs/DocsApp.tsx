import { useEffect } from 'react'
import {
  Badge,
  Container,
  ContainerSize,
  FontFamily,
  FontSize,
  FontWeight,
  Label,
  Menu,
  MenuGroup,
  MenuItem,
  Tab,
  Tabs,
  Text,
  TextColor,
} from '@/design-system'
import { ChangelogPage } from './ChangelogPage'
import { ComponentPage } from './ComponentPage'
import { ComponentsIndex } from './ComponentsIndex'
import { DocsSearch } from './DocsSearch'
import { OrchideMark } from './OrchideMark'
import { OverviewPage } from './OverviewPage'
import { markFaviconHref } from './brand'
import { categories, entries, entriesIn, findEntry } from './registry'
import { navigate, useHashRoute } from './useHashRoute'

const SECTIONS = [
  { id: 'overview', label: 'Overview', path: '/' },
  { id: 'changelog', label: 'Changelog', path: '/changelog' },
  { id: 'components', label: 'Komponenty', path: '/components' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

function parseRoute(route: string): { section: SectionId; componentId?: string } {
  if (route === '/changelog') return { section: 'changelog' }
  const component = route.match(/^\/components\/([\w-]+)$/)
  if (component) return { section: 'components', componentId: component[1] }
  if (route === '/components') return { section: 'components' }
  return { section: 'overview' }
}

function Sidebar({ activeId }: { activeId?: string }) {
  return (
    <Menu
      header="Komponenty"
      aria-label="Nawigacja po komponentach"
      className="max-h-[calc(100vh-139px)] max-bp850:max-h-none"
    >
      <MenuItem active={activeId === undefined} onClick={() => navigate('/components')}>
        Wszystkie komponenty
      </MenuItem>
      {categories.map((category) => (
        <MenuGroup key={category.id} label={category.label}>
          {entriesIn(category.id).map((entry) => (
            <MenuItem
              key={entry.id}
              nested
              active={activeId === entry.id}
              onClick={() => navigate(`/components/${entry.id}`)}
            >
              {entry.name}
            </MenuItem>
          ))}
        </MenuGroup>
      ))}
    </Menu>
  )
}

function ComponentsSection({ componentId }: { componentId?: string }) {
  const entry = componentId ? findEntry(componentId) : undefined
  return (
    <Container size={ContainerSize.Wide} className="flex gap-10 py-10 max-bp850:flex-col">
      <aside className="sticky top-[115px] w-[224px] shrink-0 self-start max-bp850:static max-bp850:w-full">
        <Sidebar activeId={entry?.id} />
      </aside>
      <main className="min-w-0 flex-1">
        {entry ? <ComponentPage key={entry.id} entry={entry} /> : <ComponentsIndex />}
      </main>
    </Container>
  )
}

export function DocsApp() {
  const route = useHashRoute()
  const { section, componentId } = parseRoute(route)

  useEffect(() => {
    document.title = 'OrchIDE UI'
    const link =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'icon' }))
    link.type = 'image/svg+xml'
    link.href = markFaviconHref()
  }, [])

  return (
    <div className="min-h-screen bg-editor">
      <header className="sticky top-0 z-10 border-b border-border-5 bg-list/95 backdrop-blur">
        <Container
          size={ContainerSize.Wide}
          className="grid grid-cols-[1fr_minmax(0,440px)_1fr] items-center gap-6 py-3 max-bp700:grid-cols-[auto_minmax(0,1fr)]"
        >
          <a href="#/" className="flex items-center gap-3 justify-self-start">
            <span className="grid size-8 place-items-center rounded-xl bg-accent/[.094] text-accent-light">
              <OrchideMark className="size-6" />
            </span>
            <span className="flex items-baseline gap-3">
              <Text
                size={FontSize.XXLarge}
                weight={FontWeight.Medium}
                color={TextColor.Heading}
                className="tracking-[-.02em]"
              >
                OrchIDE UI
              </Text>
              <Label className="max-bp850:hidden">Design system</Label>
            </span>
          </a>
          <DocsSearch />
          <Badge className="justify-self-end max-bp700:hidden">
            <Text font={FontFamily.Mono}>{entries.length} komponentów</Text>
          </Badge>
        </Container>
        <div className="border-t border-border-2 bg-bar">
          <Container size={ContainerSize.Wide}>
            <Tabs aria-label="Nawigacja główna">
              {SECTIONS.map((s) => (
                <Tab key={s.id} active={section === s.id} onSelect={() => navigate(s.path)}>
                  {s.label}
                </Tab>
              ))}
            </Tabs>
          </Container>
        </div>
      </header>

      {section === 'overview' && (
        <Container size={ContainerSize.Wide} className="py-12">
          <OverviewPage />
        </Container>
      )}
      {section === 'components' && <ComponentsSection componentId={componentId} />}
      {section === 'changelog' && (
        <Container size={ContainerSize.Wide} className="py-12">
          <ChangelogPage />
        </Container>
      )}
    </div>
  )
}
