import { Button, ExpandableGrid } from '../../../../design-system/components';
import { ProjectCard } from '../ProjectCard';
import { PROJECTS_GRID_CONFIG } from '../../Projects.consts';
import type { ProjectsGridProps } from './ProjectsGrid.types';

export function ProjectsGrid({ projects, isExpanded, onToggleExpand }: ProjectsGridProps) {
  const { VISIBLE_COUNT, COLLAPSIBLE_DURATION } = PROJECTS_GRID_CONFIG;
  const hasMoreProjects = projects.length > VISIBLE_COUNT;

  return (
    <div className="w-full mt-8">
      <ExpandableGrid
        items={projects}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap={{ mobile: 4, tablet: 6, desktop: 8 }}
        isExpanded={isExpanded}
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
