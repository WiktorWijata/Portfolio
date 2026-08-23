import type { Experience } from '../../../../api';

export interface ExperienceCardProps extends Experience {
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}
