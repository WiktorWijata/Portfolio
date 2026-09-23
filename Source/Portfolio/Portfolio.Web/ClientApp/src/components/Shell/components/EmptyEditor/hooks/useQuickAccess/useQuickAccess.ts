import { useMemo } from 'react'
import { useEditor } from '@/context'
import { findSolutionNode } from '@/navigation'
import { QUICK_ACCESS_LABELS } from '../../EmptyEditor.consts'
import type { QuickAccessItem } from '../../EmptyEditor.types'

/** Rows of "Szybki dostęp", in the order of the files in the Solution Explorer. */
export function useQuickAccess(): QuickAccessItem[] {
  const { pageOrder, solution } = useEditor()

  return useMemo(
    () =>
      pageOrder.flatMap((page): QuickAccessItem[] => {
        const label = QUICK_ACCESS_LABELS[page]
        const node = findSolutionNode(solution, page)
        return label && node ? [{ page, label, file: node.label }] : []
      }),
    [pageOrder, solution],
  )
}
