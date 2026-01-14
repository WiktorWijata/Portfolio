import { useState } from 'react';
import { SectionTitle, Button } from '../design-system/components';
import { useScrollReveal, fadeInStagger } from '../design-system/hooks';
import { useTheme } from '../design-system/themes';
import { technologies } from '../data';

type Category = 'all' | 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'others';

function Skills() {
  const { currentTheme } = useTheme();
  const { elementRef, className } = useScrollReveal({ delay: 100 });
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: 'all' as Category, label: 'Wszystkie' },
    { id: 'frontend' as Category, label: 'Frontend' },
    { id: 'backend' as Category, label: 'Backend' },
    { id: 'mobile' as Category, label: 'Mobile' },
    { id: 'database' as Category, label: 'Database' },
    { id: 'devops' as Category, label: 'DevOps' },
    { id: 'design' as Category, label: 'Design' },
    { id: 'others' as Category, label: 'Inne' }
  ];

  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);
    
  const hasMoreThanOneRow = filteredTechnologies.length > 7;

  return (
    <section id="skills" ref={elementRef} className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <SectionTitle>
          Umiejętności i technologie
        </SectionTitle>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="px-6 py-2 rounded-lg backdrop-blur-sm transition-all font-medium"
                style={{
                  border: `1px solid ${isActive ? currentTheme.colors.primary.borderGlow : currentTheme.colors.neutral.border}`,
                  backgroundColor: isActive ? currentTheme.colors.primary.bgActive : currentTheme.colors.neutral.bg,
                  boxShadow: isActive ? currentTheme.colors.primary.glow : 'none',
                  color: isActive ? currentTheme.colors.text.secondary : currentTheme.colors.text.muted
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = currentTheme.colors.text.secondary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = currentTheme.colors.text.muted;
                  }
                }}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        
        <div className="w-[1406px] mx-auto mt-8">
          <div 
            key={activeCategory}
            className="flex flex-wrap justify-center gap-8 overflow-hidden transition-all duration-700 ease-in-out py-6"
            style={{
              maxHeight: isExpanded ? '2000px' : '192px'
            }}
          >
            {filteredTechnologies.map((tech, index) => (
            <div 
              key={`${activeCategory}-${tech.name}`}
              className={`flex flex-col items-center gap-3 p-6 w-40 rounded-lg hover:scale-110 group transition-all duration-500 ${
                index >= 7 && !isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{ 
                border: `1px solid ${currentTheme.colors.neutral.border}`,
                backgroundColor: currentTheme.colors.neutral.bg,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                ...fadeInStagger(index, { staggerDelay: 0.05, duration: 0.4 })
              }}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                {tech.icon ? (
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                  />
                ) : (
                  <div className="text-4xl font-bold" style={{ color: currentTheme.colors.primary.borderHover }}>&lt;/&gt;</div>
                )}
              </div>
              <span 
                className="text-sm font-medium transition-colors" 
                style={{ color: currentTheme.colors.text.muted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = currentTheme.colors.text.secondary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = currentTheme.colors.text.muted;
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Show More/Less Button */}
        {hasMoreThanOneRow && (
          <div className="flex justify-center mt-8">
            <Button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
            </Button>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

export default Skills;
