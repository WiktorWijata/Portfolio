import { Tile, Text, TextAs, TextSize, TextWeight, TextVariant } from '../../../../design-system/components';
import { fadeIn } from '../../../../design-system/hooks';
import { FACT_CARD_CONFIG, FACT_ANIMATION_CONFIG } from '../../DidYouKnow.consts';
import type { FactCardProps } from './FactCard.types';

export function FactCard({ fact }: FactCardProps) {
  return (
    <Tile
      className="text-center flex flex-col justify-center items-center p-6 md:p-10 lg:p-12"
      style={{
        minHeight: FACT_CARD_CONFIG.minHeight,
        ...fadeIn({ 
          duration: FACT_ANIMATION_CONFIG.duration, 
          delay: FACT_ANIMATION_CONFIG.delay 
        })
      }}
    >
      <div className="text-6xl mb-6">{fact.icon}</div>
      <Text as={TextAs.H3} size={TextSize.LG} weight={TextWeight.BOLD} className="mb-4">
        {fact.title}
      </Text>
      <Text variant={TextVariant.MUTED} size={TextSize.MD} className="leading-relaxed max-w-2xl">
        {fact.description}
      </Text>
    </Tile>
  );
}
