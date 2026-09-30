import { Menu, MenuGroup, MenuItem } from '@/design-system'
import { GUIDE_INTRO, GUIDE_SECTIONS } from '../../GetStarted.consts'
import type { GuideIndexProps } from './GuideIndex.types'
import { GET_STARTED_KEYS } from '../../GetStarted.keys'
import { useTexts } from '@/i18n/hooks/useTexts'

/**
 * "Szybki przewodnik": the table of contents on the left. It stays in view while the page scrolls;
 * below 800px it shrinks to the header and the introduction (the groups are hidden).
 */
export function GuideIndex({ selectedId, onSelect }: GuideIndexProps) {
  const [text, t] = useTexts(GET_STARTED_KEYS)

  return (
    <Menu header={text.indexTitle} aria-label={text.indexLabel} className="sticky top-0 max-[800px]:static">
      <MenuItem active={selectedId === GUIDE_INTRO.id} onClick={() => onSelect(GUIDE_INTRO.id)}>
        {t(GUIDE_INTRO.indexLabelKey)}
      </MenuItem>
      <div className="max-[800px]:hidden">
        {GUIDE_SECTIONS.map((section) => (
          <MenuGroup key={section.id} label={t(section.titleKey)}>
            {section.articles.map((article) => (
              <MenuItem key={article.id} nested active={selectedId === article.id} onClick={() => onSelect(article.id)}>
                {t(article.indexLabelKey)}
              </MenuItem>
            ))}
          </MenuGroup>
        ))}
      </div>
    </Menu>
  )
}
