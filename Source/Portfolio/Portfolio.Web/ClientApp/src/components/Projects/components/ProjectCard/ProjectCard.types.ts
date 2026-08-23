import type { Project } from '../../../../api';

export interface ProjectCardProps extends Project {
  index: number;
  isVisible: boolean;
  className?: string;
}