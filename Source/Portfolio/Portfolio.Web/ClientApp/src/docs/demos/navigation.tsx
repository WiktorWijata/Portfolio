import { useState, type ReactNode } from 'react'
import { Boxes, FileText, FoldVertical, FolderOpen, ListTree, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import {
  FontSize,
  ToolbarButton,
  ToolbarButtonSize,
  Menu,
  MenuGroup,
  MenuItem,
  SearchField,
  SolutionExplorer,
  Tab,
  Tabs,
  Text,
  TextColor,
  TreeFile,
  TreeFolder,
} from '@/design-system'
import type { DocEntry } from '../types'

function MenuDemo() {
  const [active, setActive] = useState('gs-welcome')
  const group = (items: string[][]) =>
    items.map(([id, label]) => (
      <MenuItem key={id} nested active={active === id} onClick={() => setActive(id ?? '')}>
        {label}
      </MenuItem>
    ))
  return (
    <Menu header="Szybki przewodnik" aria-label="Tematy przewodnika" className="w-[200px]">
      <MenuItem active={active === 'gs-welcome'} onClick={() => setActive('gs-welcome')}>
        Wprowadzenie
      </MenuItem>
      <MenuGroup label="Portfolio">
        {group([
          ['gs-profile', 'O mnie'],
          ['gs-projects', 'Wybrane projekty'],
          ['gs-experience', 'Doświadczenie'],
          ['gs-contact', 'Kontakt i CV'],
        ])}
      </MenuGroup>
      <MenuGroup label="Nawigacja">
        {group([
          ['gs-explorer', 'Explorer i foldery'],
          ['gs-tabs', 'Zakładki dokumentów'],
          ['gs-start', 'Szybki dostęp'],
          ['gs-terminal', 'Terminal'],
        ])}
      </MenuGroup>
    </Menu>
  )
}

const tabLabels: Record<string, string> = { getstarted: 'GetStarted.md', stack: 'Stack', home: 'O mnie' }

function TabsDemo() {
  const [openTabs, setOpenTabs] = useState(['getstarted', 'stack', 'home'])
  const [activeTab, setActiveTab] = useState('stack')
  return (
    <div className="flex w-full flex-col gap-2">
      <Tabs aria-label="Otwarte zakładki" className="overflow-hidden rounded-t-md" onReorder={setOpenTabs}>
        {openTabs.map((id) => (
          <Tab
            key={id}
            id={id}
            active={activeTab === id}
            onSelect={() => setActiveTab(id)}
            closeLabel={`Zamknij kartę ${tabLabels[id]}`}
            onClose={() => {
              const remaining = openTabs.filter((t) => t !== id)
              setOpenTabs(remaining)
              if (activeTab === id) setActiveTab(remaining[remaining.length - 1] ?? '')
            }}
          >
            {tabLabels[id]}
          </Tab>
        ))}
        {!openTabs.includes('home') && (
          <button
            type="button"
            onClick={() => {
              setOpenTabs((t) => [...t, 'home'])
              setActiveTab('home')
            }}
            className="self-center px-3 font-mono text-xs text-content-muted hover:text-content-strong"
          >
            + otwórz „O mnie"
          </button>
        )}
      </Tabs>
      <div className="bg-surface-editor p-4">
        <Text size={FontSize.Small} color={TextColor.Body}>
          Zawartość zakładki:{' '}
          <strong className="text-content-strong">{tabLabels[activeTab] ?? '(brak otwartych)'}</strong>
        </Text>
      </div>
    </div>
  )
}

type ExplorerNode =
  | { type: 'file'; id: string; label: string; icon: ReactNode }
  | { type: 'folder'; id: string; label: string; icon: ReactNode; children: ExplorerNode[] }

const csIcon = (color: string) => <span className={`font-mono text-[11px] tracking-[-0.6px] ${color}`}>C#</span>

const explorerTree: ExplorerNode[] = [
  {
    type: 'file',
    id: 'getstarted',
    label: 'GetStarted.md',
    icon: <FileText className="size-4 text-filetype-markdown" />,
  },
  {
    type: 'folder',
    id: 'sln',
    label: 'WiktorWijata.sln',
    icon: <Boxes className="size-4 text-accent" />,
    children: [
      {
        type: 'folder',
        id: 'projects',
        label: 'Projects',
        icon: <FolderOpen className="size-4" />,
        children: [{ type: 'file', id: 'portfolio', label: 'Portfolio.cs', icon: csIcon('text-filetype-cs') }],
      },
      { type: 'file', id: 'stack', label: 'Stack.cs', icon: csIcon('text-filetype-cs') },
      { type: 'file', id: 'experience', label: 'Experience.cs', icon: csIcon('text-filetype-cs') },
      { type: 'file', id: 'contact', label: 'Contact.cs', icon: csIcon('text-filetype-cs') },
    ],
  },
]

function explorerNodeMatches(node: ExplorerNode, query: string): boolean {
  if (!query) return true
  if (node.label.toLowerCase().includes(query)) return true
  return node.type === 'folder' && node.children.some((child) => explorerNodeMatches(child, query))
}

function collectFolderIds(nodes: ExplorerNode[]): string[] {
  return nodes.flatMap((node) => (node.type === 'folder' ? [node.id, ...collectFolderIds(node.children)] : []))
}

const explorerFolderIds = collectFolderIds(explorerTree)
const allFolders = (open: boolean) => Object.fromEntries(explorerFolderIds.map((id) => [id, open]))

interface ExplorerRenderState {
  query: string
  activeItemId: string
  onSelectItem: (id: string) => void
  openFolders: Record<string, boolean>
  onToggleFolder: (id: string, open: boolean) => void
}

function renderExplorerTree(nodes: ExplorerNode[], state: ExplorerRenderState, level = 0): ReactNode {
  return nodes.map((node) => {
    if (!explorerNodeMatches(node, state.query)) return null
    if (node.type === 'file') {
      return (
        <TreeFile
          key={node.id}
          level={level}
          active={state.activeItemId === node.id}
          icon={node.icon}
          onClick={() => state.onSelectItem(node.id)}
        >
          {node.label}
        </TreeFile>
      )
    }
    return (
      <TreeFolder
        key={node.id}
        level={level}
        label={node.label}
        icon={node.icon}
        active={state.activeItemId === node.id}
        onClick={() => state.onSelectItem(node.id)}
        open={state.openFolders[node.id] ?? true}
        onToggle={(open) => state.onToggleFolder(node.id, open)}
      >
        {renderExplorerTree(node.children, state, level + 1)}
      </TreeFolder>
    )
  })
}

function SolutionExplorerDemo() {
  const [search, setSearch] = useState('')
  const [activeItem, setActiveItem] = useState('stack')
  const [collapsed, setCollapsed] = useState(false)
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() => allFolders(true))
  return (
    <SolutionExplorer
      collapsed={collapsed}
      className={collapsed ? '' : 'w-[224px]'}
      collapsedContent={
        <ToolbarButton
          size={ToolbarButtonSize.Sm}
          icon={<PanelLeftOpen />}
          aria-label="Pokaż explorer"
          onClick={() => setCollapsed(false)}
        />
      }
      tools={
        <>
          <ToolbarButton
            size={ToolbarButtonSize.Sm}
            icon={<ListTree />}
            aria-label="Rozwiń wszystkie foldery"
            onClick={() => setOpenFolders(allFolders(true))}
          />
          <ToolbarButton
            size={ToolbarButtonSize.Sm}
            icon={<FoldVertical />}
            aria-label="Zwiń wszystkie foldery"
            onClick={() => setOpenFolders(allFolders(false))}
          />
          <ToolbarButton
            size={ToolbarButtonSize.Sm}
            icon={<PanelLeftClose />}
            aria-label="Zwiń explorer"
            onClick={() => setCollapsed(true)}
          />
        </>
      }
      search={
        <SearchField
          placeholder="Szukaj plików…"
          aria-label="Szukaj plików w rozwiązaniu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    >
      {renderExplorerTree(explorerTree, {
        query: search.trim().toLowerCase(),
        activeItemId: activeItem,
        onSelectItem: setActiveItem,
        openFolders,
        onToggleFolder: (id, open) => setOpenFolders((prev) => ({ ...prev, [id]: open })),
      })}
    </SolutionExplorer>
  )
}

export const navigationEntries: DocEntry[] = [
  {
    id: 'menu',
    api: { folder: 'Menu', interfaces: ['MenuProps', 'MenuItemProps', 'MenuGroupProps'] },
    usage: `import { Menu, MenuItem, MenuGroup } from './design-system'

<Menu header="Szybki przewodnik" aria-label="Tematy przewodnika" className="w-[200px]">
  <MenuItem active>Wprowadzenie</MenuItem>
  <MenuGroup label="Portfolio">
    <MenuItem nested onClick={() => go('profile')}>O mnie</MenuItem>
    <MenuItem nested onClick={() => go('projects')}>Projekty</MenuItem>
  </MenuGroup>
</Menu>`,
    name: 'Menu',
    category: 'navigation',
    summary: 'Karta-spis treści z płaskimi pozycjami i rozwijalnymi grupami.',
    note: '.gs-index (GetStarted „Szybki przewodnik") — sprawdzone w DOM.',
    preview: (
      <Menu header="Przewodnik" aria-label="Podgląd menu" className="w-[170px]">
        <MenuItem active>Wprowadzenie</MenuItem>
      </Menu>
    ),
    Demo: MenuDemo,
  },
  {
    id: 'tabs',
    api: { folder: 'Tabs', interfaces: ['TabsProps', 'TabProps'] },
    usage: `import { Tabs, Tab } from './design-system'

// Zakładki plików: zamykane i przeciągane
<Tabs aria-label="Otwarte zakładki" onReorder={setOrder}>
  {order.map((id) => (
    <Tab
      key={id}
      id={id}
      active={id === active}
      onSelect={() => setActive(id)}
      onClose={() => close(id)}
      closeLabel="Zamknij kartę"
    >
      {id}
    </Tab>
  ))}
</Tabs>

// Zakładki nawigacyjne: bez onClose i onReorder
<Tabs aria-label="Nawigacja główna">
  <Tab active>Overview</Tab>
  <Tab onSelect={() => go('/changelog')}>Changelog</Tab>
</Tabs>`,
    name: 'Tabs',
    category: 'navigation',
    summary: 'Zakładki otwartych plików z zamykaniem i przeciąganiem, by zmienić kolejność.',
    note: '.tabs — stany default/hover/active/close/dragging zmierzone w computed style, przeciąganie na pointer events.',
    preview: (
      <Tabs aria-label="Podgląd zakładek" className="w-full overflow-hidden rounded-t-md">
        <Tab id="a" active onClose={() => {}} closeLabel="Zamknij Stack">
          Stack
        </Tab>
        <Tab id="b" onClose={() => {}} closeLabel="Zamknij O mnie">
          O mnie
        </Tab>
      </Tabs>
    ),
    Demo: TabsDemo,
  },
  {
    id: 'solutionexplorer',
    api: {
      folder: 'SolutionExplorer',
      interfaces: ['SolutionExplorerProps', 'SolutionExplorerLabels', 'TreeFileProps', 'TreeFolderProps'],
    },
    usage: `import { SolutionExplorer, TreeFile, TreeFolder, SearchField } from './design-system'

<SolutionExplorer
  search={<SearchField placeholder="Szukaj plików…" aria-label="Szukaj plików" />}
  footer={<ContactCard />} // przypięte do dołu, opcjonalne
>
  <TreeFolder label="WiktorWijata.sln" icon={<Boxes />}>
    <TreeFile level={1} icon={<span>C#</span>} active>
      Stack.cs
    </TreeFile>
    <TreeFile level={1} icon={<span>C#</span>}>
      Contact.cs
    </TreeFile>
  </TreeFolder>
</SolutionExplorer>`,
    name: 'SolutionExplorer',
    category: 'navigation',
    summary: 'Drzewo plików z wyszukiwarką, zwijaniem folderów i zwijanym panelem.',
    note: '.explorer/.solution-tree — wcięcia, markery plików, stan active, sprawdzone w computed style.',
    preview: (
      <div className="w-[190px] overflow-hidden border border-line-default">
        <SolutionExplorer className="w-full border-r-0" aria-label="Podgląd explorera">
          <TreeFile icon={csIcon('text-filetype-cs')}>Portfolio.cs</TreeFile>
          <TreeFile active icon={csIcon('text-filetype-cs')}>
            Stack.cs
          </TreeFile>
        </SolutionExplorer>
      </div>
    ),
    Demo: SolutionExplorerDemo,
  },
]
