import { Timeline, TimelineItem } from '../../../../design-system/components';
import { ExperienceCard } from '../ExperienceCard';
import type { ExperienceListProps } from './ExperienceList.types';

export function ExperienceList({ experiences, expandedCards, onToggleCard }: ExperienceListProps) {
  return (
    <Timeline>
      {experiences.map((exp, index) => (
        <TimelineItem key={index}>
          <ExperienceCard
            position={exp.position}
            company={exp.company}
            startDate={exp.startDate}
            endDate={exp.endDate}
            description={exp.description}
            achivements={exp.achivements}
            technologies={exp.technologies}
            index={index}
            isExpanded={expandedCards[index] ?? true}
            onToggle={() => onToggleCard(index)}
          />
        </TimelineItem>
      ))}
    </Timeline>
  );
}
