import { useState } from 'react';
import { Text, TextSize, TextVariant, TextWeight, Tile } from '../../../../design-system/components';
import { getSkillIcon } from '../../utils/getSkillIcon';
import type { SkillCardProps } from './SkillCard.types';

export function SkillCard({ name, icon, isVisible }: SkillCardProps) {
  const iconUrl = getSkillIcon(name, icon);
  const [imageError, setImageError] = useState(false);

  return (
    <Tile
      className={`flex flex-col items-center gap-3 p-4 sm:p-5 lg:p-6 w-32 sm:w-36 hover:scale-110 transition-transform duration-500 ${
        !isVisible ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
        {!imageError ? (
          <img 
            src={iconUrl} 
            alt={name}
            className="w-full h-full object-contain hover:brightness-110 transition-all"
            onError={() => setImageError(true)}
          />
        ) : (
          <Text 
            size={TextSize.XL}
            weight={TextWeight.BOLD}
            className="sm:text-2xl"
          >
            &lt;/&gt;
          </Text>
        )}
      </div>
      <Text 
        size={TextSize.XS} 
        variant={TextVariant.MUTED} 
        weight={TextWeight.MEDIUM}
      >
        {name}
      </Text>
    </Tile>
  );
}
