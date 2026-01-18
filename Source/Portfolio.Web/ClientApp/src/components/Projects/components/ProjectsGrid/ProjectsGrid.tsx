import { Button, Collapsible } from '../../../../design-system/components';
import { ProjectCard } from '../ProjectCard';
import { PROJECTS_GRID_CONFIG } from '../../Projects.consts';
import type { ProjectsGridProps } from './ProjectsGrid.types';

export function ProjectsGrid({ projects, isExpanded, onToggleExpand }: ProjectsGridProps) {
  const { VISIBLE_COUNT, COLLAPSIBLE_MAX_HEIGHT, COLLAPSIBLE_DURATION } = PROJECTS_GRID_CONFIG;
  const hasMoreProjects = projects.length > VISIBLE_COUNT;

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      {/* Mobile */}
      <div className="md:hidden">
        <Collapsible
          isOpen={isExpanded}
          maxHeight={COLLAPSIBLE_MAX_HEIGHT}
          minHeight="420px"
          duration={COLLAPSIBLE_DURATION}
        >
          <div className="grid grid-cols-1 gap-4 py-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                index={index}
                isVisible={index < 1 || isExpanded}
              />
            ))}
          </div>
        </Collapsible>
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        <Collapsible
          isOpen={isExpanded}
          maxHeight={COLLAPSIBLE_MAX_HEIGHT}
          minHeight="420px"
          duration={COLLAPSIBLE_DURATION}
        >
          <div className="grid grid-cols-2 gap-6 py-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                index={index}
                isVisible={index < 2 || isExpanded}
              />
            ))}
          </div>
        </Collapsible>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <Collapsible
          isOpen={isExpanded}
          maxHeight={COLLAPSIBLE_MAX_HEIGHT}
          minHeight="530px"
          duration={COLLAPSIBLE_DURATION}
        >
          <div className="grid grid-cols-3 gap-8 py-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                index={index}
                isVisible={index < VISIBLE_COUNT || isExpanded}
              />
            ))}
          </div>
        </Collapsible>
      </div>

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
