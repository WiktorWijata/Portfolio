import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Badge, FontSize, List, ListItem, Panel, SearchField, Text, TextColor } from '@/design-system'
import { categories, entries } from './registry'
import { navigate } from './useHashRoute'

const MAX_RESULTS = 8

export function DocsSearch({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return entries
      .filter((e) => e.name.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q))
      .sort((a, b) => Number(b.name.toLowerCase().startsWith(q)) - Number(a.name.toLowerCase().startsWith(q)))
      .slice(0, MAX_RESULTS)
  }, [query])

  const input = () => rootRef.current?.querySelector('input')

  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      const target = e.target as HTMLElement
      const typing = target.closest('input, textarea, [contenteditable]')
      if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        input()?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function choose(id: string) {
    navigate(`/components/${id}`)
    setQuery('')
    setOpen(false)
    input()?.blur()
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false)
      input()?.blur()
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!results.length) return
      setActiveIndex((i) => (i + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length)
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault()
      choose(results[activeIndex].id)
    }
  }

  const showDropdown = open && query.trim().length > 0

  return (
    <div
      ref={rootRef}
      className={['relative', className].join(' ')}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <SearchField
        placeholder="Szukaj komponentu…  ( / )"
        aria-label="Szukaj komponentu"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="docs-search-results"
        autoComplete="off"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value)
          setActiveIndex(0)
          setOpen(true)
        }}
        onKeyDown={onKeyDown}
        className="py-1.5"
      />

      {showDropdown && (
        <Panel
          id="docs-search-results"
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden"
        >
          {results.length ? (
            <List>
              {results.map((entry, i) => (
                <ListItem
                  key={entry.id}
                  title={entry.name}
                  subtitle={entry.summary}
                  active={i === activeIndex}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => choose(entry.id)}
                  trailing={<Badge>{categories.find((c) => c.id === entry.category)?.label}</Badge>}
                />
              ))}
            </List>
          ) : (
            <Text as="p" size={FontSize.Small} color={TextColor.Dim} className="px-4 py-4">
              Brak wyników dla „{query.trim()}"
            </Text>
          )}
        </Panel>
      )}
    </div>
  )
}
