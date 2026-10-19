import { PageContainerPadding, type PageContainerProps } from './PageContainer.types'

// Literal class strings — Tailwind can't scan dynamically built class names.
const paddingClasses: Record<PageContainerPadding, string> = {
  [PageContainerPadding.Content]:
    'px-[31px] pt-9 pb-[31px] max-bp1025:px-[max(20px,calc((100%-720px)/2))] max-bp1025:pt-[26px] max-bp1025:pb-[88px]',
  [PageContainerPadding.Form]:
    'p-8 max-bp1025:px-[max(20px,calc((100%-720px)/2))] max-bp1025:pt-[26px] max-bp1025:pb-[88px]',
  [PageContainerPadding.Article]: 'px-5 pt-[22px] pb-[30px] max-bp1025:px-[max(20px,calc((100%-720px)/2))]',
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
