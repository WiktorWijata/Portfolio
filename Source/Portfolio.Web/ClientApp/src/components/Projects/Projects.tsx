import { useState } from 'react';
import { SectionTitle } from '../../design-system/components';
import { useScrollReveal, useToggleWithScroll } from '../../design-system/hooks';
import { projects } from '../../data';
import { ProjectsGrid } from './components';

function Projects() {
  const { elementRef, className } = useScrollReveal({ delay: 200 });
  const { isExpanded, handleToggle } = useToggleWithScroll(elementRef);

  return (
    <section id="projects" ref={elementRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle>Projekty</SectionTitle>
        
        <ProjectsGrid
          projects={projects}
          isExpanded={isExpanded}
          onToggleExpand={handleToggle}
        />
      </div>
    </section>
  );
}

export default Projects;
