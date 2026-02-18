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

import { useTheme } from '../../../../design-system/themes';
import { useTranslation } from 'react-i18next';
import type { ExperienceCardProps } from './ExperienceCard.types';

export function ExperienceCard({ 
  position, 
  company, 
  startDate,
  endDate,
  achivements, 
  technologies,
  isExpanded, 
  onToggle 
}: ExperienceCardProps) {
  const { currentTheme } = useTheme();
  const { t } = useTranslation();

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}`;
  };

  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = endDate ? formatDate(endDate) : t('common.present');
  const period = `${startDateFormatted || ''} — ${endDateFormatted || ''}`.trim();

  return (
    <Tile className="p-6 relative">
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
          items={achivements || []}
          bullet={<Icon name={IconName.CHEVRON_RIGHT} size={IconSize.XS} color={currentTheme.colors.primary.borderHover} />}
          contentVariant={TextVariant.SECONDARY}
          size={TextSize.XS}
          className="mt-4"
        />
      </Collapsible>
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        <TagGroup 
          items={technologies || []} 
          variant={TagVariant.NEUTRAL}
          className="flex-1"
        />
        {achivements && achivements.length > 0 && (
          <Button
            onClick={onToggle}
            variant="small"
            className="-mr-2"
          >
            {isExpanded ? t('buttons.showLess') : t('buttons.showMore')}
          </Button>
        )}
      </div>
    </Tile>
  );
}
