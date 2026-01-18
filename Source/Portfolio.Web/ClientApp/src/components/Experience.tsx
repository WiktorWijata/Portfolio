import { useState } from 'react';
import { 
  SectionTitle, 
  Tag, 
  TagVariant, 
  Button, 
  Tile, 
  Timeline, 
  TimelineItem, 
  Text, 
  TextAs, 
  TextVariant, 
  TextSize, 
  Collapsible,
  List,
  TagGroup,
  Icon,
  IconName,
  IconSize,
  Container
} from '../design-system/components';
import { useScrollReveal, fadeInStagger } from '../design-system/hooks';
import { useTheme } from '../design-system/themes';
import { experiences } from '../data';

function Experience() {
  const { currentTheme } = useTheme();
  const { elementRef, className } = useScrollReveal({ delay: 200 });
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="experience" ref={elementRef} className={`py-20 px-4 ${className}`}>
      <Container>
        <SectionTitle>Doświadczenie</SectionTitle>

        <Timeline>
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              <Tile
                  className="transition-all duration-500 relative"
                  style={{
                    transformOrigin: 'left center',
                    ...fadeInStagger(index, { staggerDelay: 0.2, duration: 0.6 })
                  }}
                >
                  <Tag variant={TagVariant.DATE}>
                    {exp.period}
                  </Tag>
                  <Text className="mb-1" as={TextAs.H3} size={TextSize.MD}>
                    {exp.position}
                  </Text>
                  <Text variant={TextVariant.ACCENT} size={TextSize.SM}>
                    {exp.company}
                  </Text>
                  <Collapsible isOpen={expandedCards[index]}>
                    <List 
                      items={exp.description}
                      bullet={<Icon name={IconName.CHEVRON_RIGHT} size={IconSize.XS} color={currentTheme.colors.primary.borderHover} />}
                      contentVariant={TextVariant.SECONDARY}
                      size={TextSize.XS}
                      className="mt-4"
                    />
                  </Collapsible>
                  <div className="flex flex-wrap gap-2 mt-4 items-center">
                    <TagGroup 
                      items={exp.technologies} 
                      variant={TagVariant.NEUTRAL}
                      className="flex-1"
                    />
                    {exp.description.length > 0 && (
                      <Button
                        onClick={() => toggleCard(index)}
                        variant="small"
                        className="-mr-2"
                      >
                        {expandedCards[index] ? 'Pokaż mniej' : 'Pokaż więcej'}
                      </Button>
                    )}
                  </div>
                </Tile>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </section>
  );
}

export default Experience;
