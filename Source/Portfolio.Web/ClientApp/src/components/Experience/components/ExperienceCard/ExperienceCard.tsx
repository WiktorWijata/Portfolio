import { 
  Tag, 
  TagVariant, 
  Button, 
  Tile, 
  Text, 
  TextAs, 
  TextVariant, 
  TextSize, 
  Collapsible,
  List,
  TagGroup,
  Icon,
  IconName,
  IconSize
} from '../../../../design-system/components';
import { fadeInStagger } from '../../../../design-system/hooks';
import { useTheme } from '../../../../design-system/themes';
import { EXPERIENCE_ANIMATION_CONFIG } from '../../Experience.consts';
import type { ExperienceCardProps } from './ExperienceCard.types';

export function ExperienceCard({ 
  position, 
  company, 
  period, 
  description, 
  technologies, 
  index, 
  isExpanded, 
  onToggle 
}: ExperienceCardProps) {
  const { currentTheme } = useTheme();

  return (
    <Tile
      className="transition-all duration-500 relative"
      style={{
        transformOrigin: 'left center',
        ...fadeInStagger(index, { 
          staggerDelay: EXPERIENCE_ANIMATION_CONFIG.staggerDelay, 
          duration: EXPERIENCE_ANIMATION_CONFIG.duration 
        })
      }}
    >
      <Tag variant={TagVariant.DATE}>
        {period}
      </Tag>
      <Text className="mb-1" as={TextAs.H3} size={TextSize.MD}>
        {position}
      </Text>
      <Text variant={TextVariant.ACCENT} size={TextSize.SM}>
        {company}
      </Text>
      <Collapsible isOpen={isExpanded}>
        <List 
          items={description}
          bullet={<Icon name={IconName.CHEVRON_RIGHT} size={IconSize.XS} color={currentTheme.colors.primary.borderHover} />}
          contentVariant={TextVariant.SECONDARY}
          size={TextSize.XS}
          className="mt-4"
        />
      </Collapsible>
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <TagGroup 
          items={technologies} 
          variant={TagVariant.NEUTRAL}
          className="flex-1"
        />
        {description.length > 0 && (
          <Button
            onClick={onToggle}
            variant="small"
            className="-mr-2"
          >
            {isExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
          </Button>
        )}
      </div>
    </Tile>
  );
}
