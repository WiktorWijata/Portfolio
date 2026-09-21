import { DataCard, FontFamily, FontSize, List, ListItem, Text } from '@/design-system'
import { useEditor } from '@/context'
import { GIT_BRANCH } from '@/components/Shell/Shell.consts'
import { EMPTY_EDITOR_QUICK_ACCESS_TITLE } from '../../EmptyEditor.consts'
import { useQuickAccess } from '../../hooks/useQuickAccess'
import { formatFileCount } from '../../utils'

/** "Szybki dostęp": the main pages as rows (label + file name), with a footer of branch and file count. */
export function QuickAccess() {
  const { openPage } = useEditor()
  const items = useQuickAccess()

  return (
    <>
      <DataCard title={EMPTY_EDITOR_QUICK_ACCESS_TITLE} count={items.length}>
        <List>
          {items.map((item) => (
            <ListItem
              key={item.page}
              title={item.label}
              onClick={() => openPage(item.page)}
              trailing={
                <span className="flex items-center gap-[14px]">
                  <Text
                    as="span"
                    size={FontSize.XSmall}
                    font={FontFamily.Mono}
                    className="rounded-sm border border-chip-line bg-hover px-2 py-[2.5px] text-text-tag transition-colors duration-150 ease-out group-hover:border-accent group-hover:bg-cta-hover group-hover:text-accent-light"
                  >
                    {item.file}
                  </Text>
                  <Text
                    aria-hidden
                    size={FontSize.Small}
                    font={FontFamily.Mono}
                    className="w-0 overflow-hidden text-accent opacity-0 transition-[width,opacity] duration-150 ease-out group-hover:w-[14px] group-hover:opacity-100"
                  >
                    →
                  </Text>
                </span>
              }
            />
          ))}
        </List>
      </DataCard>
      <div className="mt-[18px] flex items-center gap-2.5">
        <Text size={FontSize.XSmall} font={FontFamily.Mono} className="tracking-[.03em] text-text-faint-2">
          {GIT_BRANCH}
        </Text>
        <i className="h-px flex-1 bg-hover-2" />
        <Text size={FontSize.XSmall} font={FontFamily.Mono} className="tracking-[.03em] text-text-faint-2">
          {formatFileCount(items.length)}
        </Text>
      </div>
    </>
  )
}
