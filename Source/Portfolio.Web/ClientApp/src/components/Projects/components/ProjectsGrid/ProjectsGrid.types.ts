import type { Project } from '../../../../data/projects';

export interface ProjectsGridProps {
  projects: Project[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}
