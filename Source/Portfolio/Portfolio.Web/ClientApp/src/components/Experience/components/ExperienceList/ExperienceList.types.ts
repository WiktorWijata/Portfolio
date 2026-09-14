import type { Experience } from '../../../../api';

export interface ExperienceListProps {
  experiences: Experience[];
  expandedCards: { [key: number]: boolean };
  onToggleCard: (index: number) => void;
}
