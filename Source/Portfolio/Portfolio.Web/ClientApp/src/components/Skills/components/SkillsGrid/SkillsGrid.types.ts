export interface Technology {
  name: string;
  category: string;
  icon?: string;
}

export interface SkillsGridProps {
  technologies: Technology[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}
