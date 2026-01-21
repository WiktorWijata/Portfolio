import { useState } from 'react';
import { SectionTitle, Container } from '../../design-system/components';
import { useScrollReveal, useToggleWithScroll } from '../../design-system/hooks';
import { useContent } from '../../api';
import { SkillsFilter, SkillsGrid, SkillsChips } from './components';
import type { Category } from './components';
import { useTranslation } from 'react-i18next';

export default function Skills() {
  const { content } = useContent();
  const { t } = useTranslation();
  const { elementRef, className } = useScrollReveal({ delay: 100 });
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const { isExpanded, handleToggle } = useToggleWithScroll(elementRef);

  // Generate categories from API data
  const categories = [
    { value: 'all' as Category, label: t('common.all') },
    ...(content?.skillsCategories?.map(cat => ({
      value: cat.name?.toLowerCase() as Category || 'all',
      label: cat.name || ''
    })) || [])
  ];

  // Flatten skills from categories to technologies array
  const technologies = content?.skillsCategories?.flatMap(category => 
    category.skills?.map(skill => ({
      name: skill.name || '',
      category: category.name?.toLowerCase() || '',
      icon: skill.icon || undefined
    })) || []
  ) || [];

  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  return (
    <section id="skills" ref={elementRef} className={`py-20 ${className}`}>
      <Container>
        <SectionTitle>
          {t('navigation.skills')}
        </SectionTitle>
        
        <SkillsFilter
          categories={categories}
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
            onToggleExpand={handleToggle}
          />
        </div>
      </Container>
    </section>
  );
}