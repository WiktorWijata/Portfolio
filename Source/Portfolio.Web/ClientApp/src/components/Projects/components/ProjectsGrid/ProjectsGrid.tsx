import { Button, ExpandableGrid } from '../../../../design-system/components';
import { useMediaQuery } from '../../../../design-system/hooks';
import { ProjectCard } from '../ProjectCard';
import { PROJECTS_GRID_CONFIG } from '../../Projects.consts';
import type { ProjectsGridProps } from './ProjectsGrid.types';

export function ProjectsGrid({ projects, isExpanded, onToggleExpand }: ProjectsGridProps) {
  const { COLLAPSIBLE_DURATION } = PROJECTS_GRID_CONFIG;
  
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  const visibleCount = isDesktop ? 3 : isTablet ? 2 : 1;
  const hasMoreProjects = projects.length > visibleCount;

  return (
    <div className="w-full mt-8">
      <ExpandableGrid
        items={projects}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap={{ mobile: 4, tablet: 6, desktop: 8 }}
        isExpanded={isExpanded}
        visibleCount={visibleCount}
        duration={COLLAPSIBLE_DURATION}
        renderItem={(project, index, isVisible) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            image={project.image}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
            index={index}
            isVisible={isVisible}
          />
        )}
      />

      {hasMoreProjects && (
        <div className="flex justify-center mt-4">
          <Button onClick={onToggleExpand}>
            {isExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
          </Button>
        </div>
      )}
    </div>
  );
}
