import { useState } from 'react';
import { SectionTitle, Tile, Tag, TagVariant, TagGroup, IconButton, Button, Icon, IconName, IconSize } from '../design-system/components';
import { useScrollReveal, fadeInStagger } from '../design-system/hooks';
import { IconButtonSize } from '../design-system/components/IconButton/IconButton.consts';
import { projects } from '../data';

function Projects() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <section id="projects" ref={elementRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-0">
        <SectionTitle>Projekty</SectionTitle>
        <div 
          className="grid grid-cols-3 gap-8 w-[1406px] mx-auto overflow-hidden transition-all duration-700 ease-in-out py-6"
          style={{
            maxHeight: showAllProjects ? '3000px' : '480px'
          }}
        >
          {projects.map((project, index) => (
            <Tile
              key={index}
              imageUrl={project.image}
              imageAlt={project.title}
              className={`flex flex-col relative transition-all duration-500 ${
                index >= 3 && !showAllProjects ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                ...fadeInStagger(index, { staggerDelay: 0.1, duration: 0.4 })
              }}
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-3">
                {project.title}
              </h3>
              
              <div className="mb-4">
                <TagGroup 
                  items={project.technologies}
                  variant={TagVariant.NEUTRAL}
                />
              </div>
              
              <p className="text-gray-400 mb-4">
                {project.description}
              </p>
              
              <div className="absolute bottom-4 right-4 flex gap-3">
                {project.githubLink && (
                  <IconButton
                    href={project.githubLink}
                    size={IconButtonSize.SMALL}
                  >
                    <Icon name={IconName.GITHUB} size={IconSize.SM} />
                  </IconButton>
                )}
                {project.liveLink && (
                  <IconButton
                    href={project.liveLink}
                    size={IconButtonSize.SMALL}
                  >
                    <Icon name={IconName.EXTERNAL_LINK} size={IconSize.SM} />
                  </IconButton>
                )}
              </div>
            </Tile>
          ))}
        </div>
        
        {projects.length > 3 && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowAllProjects(!showAllProjects)}>
              {showAllProjects ? 'Pokaż mniej' : 'Pokaż więcej'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
