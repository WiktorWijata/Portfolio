import { FontFamily, FontSize, FontWeight, Text } from '@/design-system'
import { GuideImagePosition } from '../../GetStarted.types'
import { renderRichText } from '../../utils'
import { GuideActionLink } from '../GuideActionLink'
import type { GuideArticleProps } from './GuideArticle.types'

/** One feature of the guide: a screenshot on the left, title + text + link on the right. */
export function GuideArticle({ article, onAction }: GuideArticleProps) {
  const { image } = article

  return (
    <article
      id={article.id}
      className="grid scroll-mt-[18px] grid-cols-[minmax(100px,.95fr)_minmax(0,1fr)] items-stretch gap-3.5 max-[1300px]:grid-cols-[190px_minmax(0,1fr)] max-[800px]:grid-cols-[130px_minmax(0,1fr)] max-[480px]:grid-cols-1"
    >
      <div
        className={[
          'aspect-[1.5/1] overflow-hidden rounded-sm border border-line-strong bg-surface-editor max-[480px]:w-full max-[480px]:max-w-[260px]',
          image.centerFrame ? 'self-center' : '',
        ].join(' ')}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className={[
            'block size-full object-contain',
            image.position === GuideImagePosition.Center ? 'object-center' : 'object-top',
          ].join(' ')}
        />
      </div>
      <div className="flex min-w-0 flex-col">
        <Text
          as="h3"
          font={FontFamily.Sans}
          weight={FontWeight.Medium}
          className="mt-px mb-2.5 text-[18px] leading-[1.35] text-content-strong"
        >
          {article.title}
        </Text>
        {article.paragraphs.map((paragraph) => (
          <Text
            key={paragraph}
            as="p"
            size={FontSize.Medium}
            font={FontFamily.Sans}
            className="leading-[1.65] text-content-body"
          >
            {renderRichText(paragraph)}
          </Text>
        ))}
        {article.action && (
          <GuideActionLink action={article.action} onRun={onAction} className="mt-auto self-start pt-3" />
        )}
      </div>
    </article>
  )
}
