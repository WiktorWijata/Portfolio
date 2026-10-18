import { Moon, Sun } from 'lucide-react'
import { FontFamily, Text, ThemeName, useTheme } from '@/design-system'
import { usePreferences } from '@/context'
import { useTexts } from '@/i18n/hooks/useTexts'
import { LANGUAGE_OPTIONS } from '../../../AppStatusBar/AppStatusBar.consts'
import { STATUS_BAR_KEYS } from '../../../AppStatusBar/AppStatusBar.keys'
import type { MobileHeaderProps } from './MobileHeader.types'

/** Top bar of the phone layout: the current file on the left, the theme and language switches on the right. */
export function MobileHeader({ file }: MobileHeaderProps) {
  const [text] = useTexts(STATUS_BAR_KEYS)
  const { language, setLanguage } = usePreferences()
  const [theme, setTheme] = useTheme()
  const dark = theme === ThemeName.Dark

  return (
    <header className="flex h-12 flex-none items-center justify-between gap-3 border-b border-line-default bg-surface-panel pr-3 pl-4">
      <div className="flex min-w-0 items-center gap-2">
        <span aria-hidden className="font-tree text-xs font-medium tracking-[-.6px] text-success-content">
          cs
        </span>
        <Text
          as="h1"
          font={FontFamily.Mono}
          className="m-0 truncate text-base leading-[normal] font-medium text-content-primary"
        >
          {file}
        </Text>
      </div>
      <div className="flex flex-none items-center gap-2">
        <button
          type="button"
          aria-label={dark ? text.themeLightAria : text.themeDarkAria}
          onClick={() => setTheme(dark ? ThemeName.Light : ThemeName.Dark)}
          className="grid size-9 cursor-pointer place-items-center rounded-sm border-0 bg-transparent text-content-muted focus-ring [&_svg]:size-[17px]"
        >
          {dark ? <Sun strokeWidth={1.5} /> : <Moon strokeWidth={1.5} />}
        </button>
        <div
          role="group"
          aria-label={text.languageSwitch}
          className="flex overflow-hidden rounded-sm border border-line-emphasis"
        >
          {LANGUAGE_OPTIONS.map((option) => {
            const selected = option.value === language
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                aria-label={option['aria-label']}
                onClick={() => setLanguage(option.value)}
                className={[
                  'h-8 min-w-11 cursor-pointer border-0 font-mono text-xs font-medium focus-ring',
                  selected ? 'bg-accent-surface text-accent-soft' : 'bg-transparent text-content-muted',
                ].join(' ')}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
