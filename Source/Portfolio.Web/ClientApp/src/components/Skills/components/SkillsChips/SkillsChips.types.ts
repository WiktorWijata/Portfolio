export interface Technology {
  name: string;
  category: string;
  icon?: string;
}

export interface SkillsChipsProps {
  technologies: Technology[];
}
