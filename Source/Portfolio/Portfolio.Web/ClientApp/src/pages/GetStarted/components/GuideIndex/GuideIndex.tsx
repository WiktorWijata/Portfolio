import { Menu, MenuGroup, MenuItem } from '@/design-system'
import { GUIDE_INDEX_LABEL, GUIDE_INDEX_TITLE, GUIDE_INTRO, GUIDE_SECTIONS } from '../../GetStarted.consts'
import type { GuideIndexProps } from './GuideIndex.types'

/**
 * "Szybki przewodnik": the table of contents on the left. It stays in view while the page scrolls;
 * below 800px it shrinks to the header and the introduction (the groups are hidden).
 */
export function GuideIndex({ selectedId, onSelect }: GuideIndexProps) {
  return (
    <Menu header={GUIDE_INDEX_TITLE} aria-label={GUIDE_INDEX_LABEL} className="sticky top-0 max-[800px]:static">
      <MenuItem active={selectedId === GUIDE_INTRO.id} onClick={() => onSelect(GUIDE_INTRO.id)}>
        {GUIDE_INTRO.indexLabel}
      </MenuItem>
      <div className="max-[800px]:hidden">
        {GUIDE_SECTIONS.map((section) => (
          <MenuGroup key={section.id} label={section.title}>
            {section.articles.map((article) => (
              <MenuItem key={article.id} nested active={selectedId === article.id} onClick={() => onSelect(article.id)}>
                {article.indexLabel}
              </MenuItem>
            ))}
          </MenuGroup>
        ))}
      </div>
    </Menu>
  )
}
