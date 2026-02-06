import { useState } from 'react';
import { Text, TextSize, TextVariant, TextWeight, Tile, CircularProgress } from '../../../../design-system/components';
import { useTheme } from '../../../../design-system/themes';
import { getSkillIcon } from '../../utils/getSkillIcon';
import type { SkillCardProps } from './SkillCard.types';

export function SkillCard({ name, icon }: SkillCardProps) {
  const iconUrl = getSkillIcon(name, icon);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const { currentTheme } = useTheme();

  return (
    <Tile
      className="flex flex-col items-center gap-3 p-4 sm:p-5 lg:p-6 min-w-32 sm:min-w-36 hover:scale-110 transition-transform duration-500"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center relative">
        {imageLoading && !imageError && (
          <CircularProgress size="md" />
        )}
        {!imageError && (
          <img 
            src={iconUrl} 
            alt={name}
            className="w-full h-full object-contain hover:brightness-110 transition-all absolute"
            onError={() => { setImageError(true); setImageLoading(false); }}
            style={{ display: 'none' }}
            onLoad={(e) => { e.currentTarget.style.display = 'block'; setImageLoading(false); }}
          />
        )}
        {imageError && (
          <Text 
            size={TextSize.XL}
            weight={TextWeight.BOLD}
            className="sm:text-2xl"
            style={{ color: currentTheme.colors.primary.borderHover }}
          >
            &lt;/&gt;
          </Text>
        )}
      </div>
      <Text 
        size={TextSize.XS} 
        variant={TextVariant.MUTED} 
        weight={TextWeight.MEDIUM}
        className="whitespace-nowrap"
      >
        {name}
      </Text>
    </Tile>
  );
}
