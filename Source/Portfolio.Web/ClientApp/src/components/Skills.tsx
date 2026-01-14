import { useState } from 'react';
import { SectionTitle, Button } from '../design-system/components';
import { useScrollReveal, fadeInStagger } from '../design-system/hooks';
import { colors } from '../design-system/tokens';
import { technologies } from '../data';

type Category = 'all' | 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'others';

function Skills() {
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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-lg backdrop-blur-sm transition-all font-medium ${
                activeCategory === category.id ? 'text-gray-300' : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{
                border: `1px solid ${activeCategory === category.id ? colors.primary.borderGlow : colors.neutral.border}`,
                backgroundColor: activeCategory === category.id ? colors.primary.bgActive : colors.neutral.bg,
                boxShadow: activeCategory === category.id ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none'
              }}
            >
              {category.label}
            </button>
          ))}
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
                border: `1px solid ${colors.neutral.border}`,
                backgroundColor: colors.neutral.bg,
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
                  <div className="text-purple-400 text-4xl font-bold">&lt;/&gt;</div>
                )}
              </div>
              <span className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
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
