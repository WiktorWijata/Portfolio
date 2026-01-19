import { Text, TextSize, TextVariant, TextWeight } from '../../../../design-system/components';
import { fadeInStagger } from '../../../../design-system/hooks';
import { useTheme } from '../../../../design-system/themes';
import type { SkillCardProps } from './SkillCard.types';
import { SKILL_CARD_CONFIG } from './SkillCard.types';

const { STAGGER_DELAY, ANIMATION_DURATION, BACKDROP_BLUR } = SKILL_CARD_CONFIG;

export function SkillCard({ name, icon, index, isVisible }: SkillCardProps) {
  const { currentTheme } = useTheme();

  return (
    <div 
      className={`flex flex-col items-center gap-3 p-4 sm:p-5 lg:p-6 w-32 sm:w-36 lg:w-36 rounded-lg hover:scale-110 group transition-all duration-500 ${
        !isVisible ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ 
        border: `1px solid ${currentTheme.colors.neutral.border}`,
        backgroundColor: currentTheme.colors.neutral.bg,
        backdropFilter: BACKDROP_BLUR,
        WebkitBackdropFilter: BACKDROP_BLUR,
        ...fadeInStagger(index, { staggerDelay: STAGGER_DELAY, duration: ANIMATION_DURATION })
      }}
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
        {icon ? (
          <img 
            src={icon} 
            alt={name}
            className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
          />
        ) : (
          <Text 
            size={TextSize.XL} 
            variant={TextVariant.ACCENT} 
            weight={TextWeight.BOLD}
          >
            &lt;/&gt;
          </Text>
        )}
      </div>
      <Text 
        size={TextSize.XS} 
        variant={TextVariant.MUTED} 
        weight={TextWeight.MEDIUM}
        hover
      >
        {name}
      </Text>
    </div>
  );
}
