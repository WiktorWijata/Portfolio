import { SectionTitle, Container } from '../../design-system/components';
import { useScrollReveal, useToggleWithScroll } from '../../design-system/hooks';
import { useContent } from '../../api';
import { useTranslation } from 'react-i18next';
import { ProjectsGrid } from './components';

function Projects() {
  const { content } = useContent();
  const { t } = useTranslation();
  const { elementRef, className } = useScrollReveal({ delay: 200 });
  const { isExpanded, handleToggle } = useToggleWithScroll(elementRef);

  if (!content) {
    return null;
  }

  return (
    <section id="projects" ref={elementRef} className={`py-20 ${className}`}>
      <Container>
        <SectionTitle>{t('navigation.projects')}</SectionTitle>
        
        <ProjectsGrid
          projects={content.projects || []}
          isExpanded={isExpanded}
          onToggleExpand={handleToggle}
        />
      </Container>
    </section>
  );
}

export default Projects;
