import type { ProjectDto } from '../../../../api';

export interface ProjectsGridProps {
  projects: ProjectDto[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}
