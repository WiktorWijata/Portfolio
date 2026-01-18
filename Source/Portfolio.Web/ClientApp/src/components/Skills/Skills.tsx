import { useState } from 'react';
import { SectionTitle } from '../../design-system/components';
import { useScrollReveal } from '../../design-system/hooks';
import { technologies } from '../../data';
import { SkillsFilter, SkillsGrid, SkillsChips } from './components';
import type { Category } from './components';

export default function Skills() {
  const { elementRef, className } = useScrollReveal({ delay: 100 });
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  return (
    <section id="skills" ref={elementRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle>
          Umiejętności i technologie
        </SectionTitle>
        
        <SkillsFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <div className="block lg:hidden">
          <SkillsChips technologies={filteredTechnologies} />
        </div>

        <div className="hidden lg:block">
          <SkillsGrid
            technologies={filteredTechnologies}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
    </section>
  );
}