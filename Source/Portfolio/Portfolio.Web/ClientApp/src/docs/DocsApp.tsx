import { useEffect, useMemo } from 'react'
import { Moon, Sun } from 'lucide-react'
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
  StatusBarSwitch,
  Tab,
  Tabs,
  Text,
  TextColor,
  ThemeName,
  useTheme,
  type StatusBarSwitchOption,
} from '@/design-system'
import { Language } from '@/context/PreferencesContext/PreferencesContext.types'
import { useTexts } from '@/i18n/hooks/useTexts'
import { DOCS_KEYS } from './Docs.keys'
import { useDocsLanguage } from './hooks/useDocsLanguage'
import { ChangelogPage } from './ChangelogPage'
import { ComponentPage } from './ComponentPage'
import { ComponentsIndex } from './ComponentsIndex'
import { DocsSearch } from './DocsSearch'
import { OrchideMark } from './OrchideMark'
import { OverviewPage } from './OverviewPage'
import { ThemesPage } from './ThemesPage'
import { markFaviconHref } from './brand'
import { categories, entries, entriesIn, findEntry } from './registry'
import { navigate, useHashRoute } from './useHashRoute'

const SECTIONS = [
  { id: 'overview', path: '/' },
  { id: 'changelog', path: '/changelog' },
  { id: 'components', path: '/components' },
  { id: 'themes', path: '/themes' },
] as const

const LANGUAGE_OPTIONS: StatusBarSwitchOption<Language>[] = [
  { value: Language.Pl, label: 'PL', 'aria-label': 'Polski' },
  { value: Language.En, label: 'EN', 'aria-label': 'English' },
]

type SectionId = (typeof SECTIONS)[number]['id']

function parseRoute(route: string): { section: SectionId; componentId?: string } {
  if (route === '/changelog') return { section: 'changelog' }
  if (route === '/themes') return { section: 'themes' }
  const component = route.match(/^\/components\/([\w-]+)$/)
  if (component) return { section: 'components', componentId: component[1] }
  if (route === '/components') return { section: 'components' }
  return { section: 'overview' }
}

function Sidebar({ activeId }: { activeId?: string }) {
  const [text] = useTexts(DOCS_KEYS, 'docs')
  return (
    <Menu
      header={text.app.sidebarHeader}
      aria-label={text.app.sidebarLabel}
      className="max-h-[calc(100vh-139px)] max-bp850:max-h-none"
    >
      <MenuItem active={activeId === undefined} onClick={() => navigate('/components')}>
        {text.app.allComponents}
      </MenuItem>
      {categories.map((category) => (
        <MenuGroup key={category.id} label={text.categories[category.id]}>
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
  const [text, t] = useTexts(DOCS_KEYS, 'docs')
  const [language, setLanguage] = useDocsLanguage()
  const route = useHashRoute()
  const { section, componentId } = parseRoute(route)
  const [theme, setTheme] = useTheme()
  const themeOptions = useMemo<StatusBarSwitchOption<ThemeName>[]>(
    () => [
      {
        value: ThemeName.Dark,
        label: text.app.themeDark,
        icon: <Moon strokeWidth={1.5} />,
        'aria-label': text.app.themeDarkAria,
      },
      {
        value: ThemeName.Light,
        label: text.app.themeLight,
        icon: <Sun strokeWidth={1.5} />,
        'aria-label': text.app.themeLightAria,
      },
    ],
    [text],
  )

  useEffect(() => {
    document.title = 'OrchIDE UI'
    const link =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'icon' }))
    link.type = 'image/svg+xml'
    link.href = markFaviconHref()
  }, [theme])

  return (
    <div className="min-h-screen bg-surface-editor">
      <header className="sticky top-0 z-10 border-b border-line-emphasis bg-surface-panel/95 backdrop-blur">
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
              <Label className="max-bp850:hidden">{text.app.designSystem}</Label>
            </span>
          </a>
          <DocsSearch />
          <div className="flex items-center gap-3 justify-self-end max-bp700:col-span-2">
            <StatusBarSwitch aria-label={text.app.theme} value={theme} onChange={setTheme} options={themeOptions} />
            <StatusBarSwitch
              aria-label={text.app.language}
              value={language}
              onChange={setLanguage}
              options={LANGUAGE_OPTIONS}
            />
            <Badge className="max-bp700:hidden">
              <Text font={FontFamily.Mono}>{t(DOCS_KEYS.app.componentCount, { count: entries.length })}</Text>
            </Badge>
          </div>
        </Container>
        <div className="border-t border-line-subtle bg-surface-bar">
          <Container size={ContainerSize.Wide}>
            <Tabs aria-label={text.app.mainNav}>
              {SECTIONS.map((s) => (
                <Tab key={s.id} active={section === s.id} onSelect={() => navigate(s.path)}>
                  {text.app.sections[s.id]}
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
      {section === 'themes' && (
        <Container size={ContainerSize.Wide} className="py-12">
          <ThemesPage />
        </Container>
      )}
      {section === 'changelog' && (
        <Container size={ContainerSize.Wide} className="py-12">
          <ChangelogPage />
        </Container>
      )}
    </div>
  )
}
