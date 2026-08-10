import { Button, ExpandableGrid } from '../../../../design-system/components';
import { useMediaQuery } from '../../../../design-system/hooks';
import { ProjectCard } from '../ProjectCard';
import { ProjectsGridConfig } from '../../Projects.consts';
import type { ProjectsGridProps } from './ProjectsGrid.types';
import { useTranslation } from 'react-i18next';

export function ProjectsGrid({ projects, isExpanded, onToggleExpand }: ProjectsGridProps) {
  const { t } = useTranslation();
  const { COLLAPSIBLE_DURATION } = ProjectsGridConfig;
  
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
            {...project}
            index={index}
            isVisible={isVisible}
          />
        )}
      />

      {hasMoreProjects && (
        <div className="flex justify-center mt-4">
          <Button onClick={onToggleExpand}>
            {isExpanded ? t('buttons.showLess') : t('buttons.showMore')}
          </Button>
        </div>
      )}
    </div>
  );
}
