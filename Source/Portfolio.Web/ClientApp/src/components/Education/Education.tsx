import { SectionTitle, Tag, TagVariant, Text, TextSize, TextVariant, TextWeight, TextAs, Timeline, TimelineItem, Tile, Alignment, Container } from '../../design-system/components';
import { useContent } from '../../api';
import { useTranslation } from 'react-i18next';

export default function Education() {
  const { content } = useContent();
  const { t } = useTranslation();

  const getYear = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.getFullYear().toString();
  };

  if (!content) {
    return null;
  }

  return (
    <section id="education" className="py-20">
      <Container>
        <SectionTitle>{t('navigation.education')}</SectionTitle>

        <Timeline align={Alignment.RIGHT}>
          {content.educations?.map((edu, index) => {
            const startYear = getYear(edu.startDate);
            const endYear = getYear(edu.endDate);
            const period = startYear && endYear ? `${startYear} - ${endYear}` : '';

            return (
              <TimelineItem key={index}>
                <Tile className="p-6 relative">
                  <Tag variant={TagVariant.DATE}>{period}</Tag>
                  <Text as={TextAs.H3} size={TextSize.MD} weight={TextWeight.BOLD} className="mb-1">
                    {edu.degree} - {edu.field}
                  </Text>
                  <Text size={TextSize.SM} variant={TextVariant.ACCENT} weight={TextWeight.MEDIUM}>
                    {edu.institution}
                  </Text>
                </Tile>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Container>
    </section>
  );
}