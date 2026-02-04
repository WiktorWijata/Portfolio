import { Tile, TagGroup, TagVariant, Text, TextAs, TextSize, TextWeight, TextVariant } from '../../../../design-system/components';
import { ProjectActions } from '../ProjectActions';
import type { ProjectCardProps } from './ProjectCard.types';

export function ProjectCard({ 
  title, 
  description, 
  technologies, 
  imageUrl, 
  codeUrl, 
  liveUrl,
  className = '' 
}: ProjectCardProps) {

  return (
    <Tile className={`flex flex-col relative ${className}`}>
      {imageUrl && (
        <div className="mb-4 overflow-hidden rounded-t-lg">
          <img 
            src={imageUrl} 
            alt={title || ''}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="px-6 pb-20 pt-2 flex flex-col flex-grow">
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
      </div>
    </Tile>
  );
}
