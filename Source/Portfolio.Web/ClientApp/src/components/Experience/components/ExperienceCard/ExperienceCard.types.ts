export interface ExperienceCardProps {
  position: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}
