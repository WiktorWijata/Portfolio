import type { ProjectDto } from '../../../../api';

export interface ProjectCardProps extends ProjectDto {
  index: number;
  isVisible: boolean;
  className?: string;
}