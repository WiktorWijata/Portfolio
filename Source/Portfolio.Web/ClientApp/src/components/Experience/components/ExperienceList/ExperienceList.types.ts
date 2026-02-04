import type { ExperienceDto } from '../../../../api';

export interface ExperienceListProps {
  experiences: ExperienceDto[];
  expandedCards: { [key: number]: boolean };
  onToggleCard: (index: number) => void;
}
