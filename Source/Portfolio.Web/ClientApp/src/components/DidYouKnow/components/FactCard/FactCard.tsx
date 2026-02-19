import { Tile, Text, TextAs, TextSize, TextWeight, TextVariant, Alignment } from '../../../../design-system/components';
import { fadeIn } from '../../../../design-system/hooks';
import { FactCardConfig, FactAnimationConfig } from '../../DidYouKnow.consts';
import type { FactCardProps } from './FactCard.types';

export function FactCard({ fact }: FactCardProps) {
  const factIcon = fact.icon ?? '💡';
  
  return (
    <Tile
      className="text-center flex flex-col justify-center items-center p-6 md:p-10 lg:p-12 h-full"
      style={{
        minHeight: FactCardConfig.MIN_HEIGHT,
        ...fadeIn({ 
          duration: FactAnimationConfig.DURATION, 
          delay: FactAnimationConfig.DELAY 
        })
      }}
    >
      <div className="text-6xl mb-6">{factIcon}</div>
      <Text as={TextAs.H3} size={TextSize.LG} weight={TextWeight.BOLD} align={Alignment.CENTER} className="mb-4">
        {fact.title}
      </Text>
      <Text variant={TextVariant.MUTED} size={TextSize.MD} align={Alignment.CENTER} className="leading-loose max-w-4xl">
        {fact.description}
      </Text>
    </Tile>
  );
}
