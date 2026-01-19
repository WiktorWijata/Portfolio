export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubLink?: string;
  liveLink?: string;
  index: number;
  isVisible: boolean;
  className?: string;
}