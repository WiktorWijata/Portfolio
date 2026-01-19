import { Button, Collapsible } from '../../../../design-system/components';
import { SkillCard } from '../SkillCard/SkillCard';
import { SKILLS_GRID_CONFIG } from '../../Skills.consts';
import type { SkillsGridProps } from './SkillsGrid.types';

export function SkillsGrid({ 
  technologies, 
  isExpanded, 
  onToggleExpand 
}: SkillsGridProps) {
  const { DESKTOP_MIN_HEIGHT, DESKTOP_VISIBLE_COUNT, COLLAPSIBLE_MAX_HEIGHT, COLLAPSIBLE_DURATION } = SKILLS_GRID_CONFIG;
  const hasMoreThanOneRow = technologies.length > DESKTOP_VISIBLE_COUNT;

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <Collapsible 
        isOpen={isExpanded} 
        maxHeight={COLLAPSIBLE_MAX_HEIGHT}
        minHeight={DESKTOP_MIN_HEIGHT}
        duration={COLLAPSIBLE_DURATION}
      >
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 py-6">
          {technologies.map((tech, index) => (
            <SkillCard
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              index={index}
              isVisible={index < DESKTOP_VISIBLE_COUNT || isExpanded}
            />
          ))}
        </div>
      </Collapsible>
    
      {hasMoreThanOneRow && (
        <div className="flex justify-center mt-8">
          <Button onClick={onToggleExpand}>
            {isExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
          </Button>
        </div>
      )}
    </div>
  );
}
