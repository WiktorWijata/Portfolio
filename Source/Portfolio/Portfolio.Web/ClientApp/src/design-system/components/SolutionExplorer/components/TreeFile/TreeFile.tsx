import { FontFamily, FontSize, Text } from '../../../Text'
import { rowShape } from '../../SolutionExplorer.consts'
import { indentStyle } from '../../utils/indentStyle'
import type { TreeFileProps } from './TreeFile.types'

export function TreeFile({ level = 0, active = false, icon, className = '', children, style, ...rest }: TreeFileProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      style={{ ...indentStyle(level), ...style }}
      className={[
        rowShape,
        'flex items-center gap-[7px] py-0.5 pr-2 pl-[calc(17px+var(--tree-indent,0px))]',
        'text-left',
        'transition-colors duration-150 ease-out',
        active
          ? 'bg-accent-surface text-content-strong shadow-[inset_2px_0_0_0_var(--color-accent)]'
          : 'bg-transparent text-content-secondary hover:bg-surface-active',
        className,
      ].join(' ')}
      {...rest}
    >
      <Text size={FontSize.Small} className="flex w-[18px] shrink-0 items-center justify-center">
        {icon}
      </Text>
      <Text size={FontSize.Small} font={FontFamily.Sans} className="truncate">
        {children}
      </Text>
    </button>
  )
}
