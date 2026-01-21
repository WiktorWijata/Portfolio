import { Tile, TagGroup, TagVariant, Text, TextAs, TextSize, TextWeight, TextVariant } from '../../../../design-system/components';
import { fadeInStagger } from '../../../../design-system/hooks';
import { ProjectActions } from '../ProjectActions';
import type { ProjectCardProps } from './ProjectCard.types';

export function ProjectCard({ 
  title, 
  description, 
  technologies, 
  imageUrl, 
  codeUrl, 
  liveUrl, 
  index,
  className = '' 
}: ProjectCardProps) {

  return (
    <Tile
      imageUrl={imageUrl || undefined}
      imageAlt={title || undefined}
      className={`flex flex-col relative pb-20 ${className}`}
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
          items={technologies || []}
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
        githubLink={codeUrl || undefined}
        liveLink={liveUrl || undefined}
        className="absolute bottom-3 right-4"
      />
    </Tile>
  );
}
