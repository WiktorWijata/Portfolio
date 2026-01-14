import { SectionTitle, Tag, TagVariant, Text, TextSize, TextVariant, TextWeight, TextAs, Timeline, TimelineItem, Tile, Alignment } from '../design-system/components';
import { useScrollReveal, fadeInStagger } from '../design-system/hooks';
import { education } from '../data';

function Education() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });

  return (
    <section id="education" ref={elementRef} className={`py-20 px-4 ${className}`}>
      <div className="container mx-auto px-0">
        <SectionTitle>Edukacja i certyfikaty</SectionTitle>

        <Timeline align={Alignment.RIGHT}>
          {education.map((edu, index) => (
            <TimelineItem key={index}>
              <Tile
                className="transition-all duration-500 relative"
                style={{
                  transformOrigin: 'right center',
                  ...fadeInStagger(index, { staggerDelay: 0.2, duration: 0.6 })
                }}
              >
                <Tag variant={TagVariant.DATE}>{edu.period}</Tag>
                <Text as={TextAs.H3} size={TextSize.MD} weight={TextWeight.BOLD} className="mb-1">
                  {edu.degree}
                </Text>
                <Text size={TextSize.SM} variant={TextVariant.ACCENT} weight={TextWeight.MEDIUM}>
                  {edu.school}
                </Text>
              </Tile>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}

export default Education;
