import { Tile, TagGroup, TagVariant } from '../../../../design-system/components';
import { fadeInStagger } from '../../../../design-system/hooks';
import { useTheme } from '../../../../design-system/themes';
import { ProjectActions } from '../ProjectActions';
import type { ProjectCardProps } from './ProjectCard.types';

export function ProjectCard({ 
  title, 
  description, 
  technologies, 
  image, 
  githubLink, 
  liveLink, 
  index,
  isVisible,
  className = '' 
}: ProjectCardProps) {
  const { currentTheme } = useTheme();

  return (
    <Tile
      imageUrl={image}
      imageAlt={title}
      className={`flex flex-col relative pb-14 transition-all duration-500 ${
        !isVisible ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${className}`}
      style={fadeInStagger(index, { staggerDelay: 0.1, duration: 0.4 })}
    >
      <h3 
        className="text-xl sm:text-2xl font-bold mb-3"
        style={{ color: currentTheme.colors.text.secondary }}
      >
        {title}
      </h3>
      
      <div className="mb-4">
        <TagGroup 
          items={technologies}
          variant={TagVariant.NEUTRAL}
        />
      </div>
      
      <p 
        className="text-sm sm:text-base mb-4 flex-grow"
        style={{ color: currentTheme.colors.text.muted }}
      >
        {description}
      </p>
      
      <ProjectActions 
        githubLink={githubLink}
        liveLink={liveLink}
        className="absolute bottom-4 right-4"
      />
    </Tile>
  );
}
