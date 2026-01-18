import { Tile, TagGroup, TagVariant, Text, TextAs, TextSize, TextWeight, TextVariant } from '../../../../design-system/components';
import { fadeInStagger } from '../../../../design-system/hooks';
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

  return (
    <Tile
      imageUrl={image}
      imageAlt={title}
      className={`flex flex-col relative pb-20 transition-all duration-500 ${
        !isVisible ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${className}`}
      style={fadeInStagger(index, { staggerDelay: 0.1, duration: 0.4 })}
    >
      <Text
        as={TextAs.H3}
        size={TextSize.MD}
        weight={TextWeight.BOLD}
        variant={TextVariant.SECONDARY}
        className="mb-3 line-clamp-2"
      >
        {title}
      </Text>
      
      <div className="mb-4">
        <TagGroup 
          items={technologies}
          variant={TagVariant.NEUTRAL}
        />
      </div>
      
      <Text
        as={TextAs.P}
        size={TextSize.SM}
        variant={TextVariant.MUTED}
        className="mb-4 flex-grow line-clamp-3 lg:line-clamp-2"
      >
        {description}
      </Text>
      
      <ProjectActions 
        githubLink={githubLink}
        liveLink={liveLink}
        className="absolute bottom-3 right-4"
      />
    </Tile>
  );
}
