import type { Project } from '../../../../api';

export interface ProjectsGridProps {
  projects: Project[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}
