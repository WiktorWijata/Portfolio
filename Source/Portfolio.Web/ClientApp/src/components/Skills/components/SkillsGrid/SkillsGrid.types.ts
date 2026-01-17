import type { Technology } from '../../../../data/types';

export interface SkillsGridProps {
  technologies: Technology[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}
