import { PageContainerPadding, type PageContainerProps } from './PageContainer.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const paddingClasses: Record<PageContainerPadding, string> = {
  [PageContainerPadding.Content]:
    'px-[31px] pt-9 pb-[31px] max-bp850:px-[22px] max-bp850:pt-[25px] max-bp570:px-[18px] max-bp570:pt-7',
  [PageContainerPadding.Form]: 'p-8 max-bp600:p-[18px]',
  [PageContainerPadding.Article]: 'px-5 pt-[22px] pb-[30px]',
}

/** The surface every page sits on: it fills the editor area with the dotted, accent-glow background. */
export function PageContainer({
  padding = PageContainerPadding.Content,
  className = '',
  children,
  ...rest
}: PageContainerProps) {
  return (
    <div className={['flex-1 bg-dotted-glow', paddingClasses[padding], className].join(' ')} {...rest}>
      {children}
    </div>
  )
}
