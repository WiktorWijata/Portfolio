import type { ExperienceDto } from '../../../../api';

export interface ExperienceCardProps extends ExperienceDto {
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}
