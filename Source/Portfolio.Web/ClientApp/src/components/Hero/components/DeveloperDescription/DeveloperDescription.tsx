import { Icon, IconName, IconSize, Tile, Text, TextSize, TextVariant, TextWeight, TextAs, Alignment } from '../../../../design-system/components';
import { useTheme } from '../../../../design-system/themes';
import type { DeveloperDescriptionProps } from './DeveloperDescription.types';

export function DeveloperDescription({ 
  title, 
  greeting, 
  paragraphs,
  className = '' 
}: DeveloperDescriptionProps) {
  const { currentTheme } = useTheme();

  return (
    <Tile className={`w-full min-h-[400px] lg:min-h-[550px] flex items-start justify-center ${className}`}>
      <div className="flex flex-col gap-6 lg:gap-8 mt-6 lg:mt-8">
        <Text 
          as={TextAs.H2} 
          size={TextSize.XL} 
          variant={TextVariant.SECONDARY} 
          weight={TextWeight.SEMIBOLD}
          className="flex items-center gap-4"
        >
          <Icon name={IconName.CODE} size={IconSize.XL} color={currentTheme.colors.primary.borderHover} />
          {title}
        </Text>
        
        <Text 
          size={TextSize.LG} 
          variant={TextVariant.MUTED} 
          weight={TextWeight.SEMIBOLD}
          align={Alignment.JUSTIFY}
          className="leading-relaxed"
        >
          {greeting}
        </Text>
        
        {paragraphs.map((paragraph, index) => (
          <Text 
            key={index}
            variant={TextVariant.MUTED}
            className="leading-relaxed"
          >
            {paragraph}
          </Text>
        ))}
      </div>
    </Tile>
  );
}
