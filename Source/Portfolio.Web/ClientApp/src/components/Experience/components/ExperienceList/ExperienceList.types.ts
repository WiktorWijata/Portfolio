export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface ExperienceListProps {
  experiences: Experience[];
  expandedCards: { [key: number]: boolean };
  onToggleCard: (index: number) => void;
}
