import { useState } from 'react';
import { 
  SectionTitle, 
  Button, 
  Text, 
  TextSize, 
  TextVariant, 
  TextWeight, 
  ToggleButtonGroup, 
  Collapsible 
} from '../design-system/components';
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
    { value: 'all' as Category, label: 'Wszystkie' },
    { value: 'frontend' as Category, label: 'Frontend' },
    { value: 'backend' as Category, label: 'Backend' },
    { value: 'mobile' as Category, label: 'Mobile' },
    { value: 'database' as Category, label: 'Database' },
    { value: 'devops' as Category, label: 'DevOps' },
    { value: 'design' as Category, label: 'Design' },
    { value: 'others' as Category, label: 'Inne' }
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
        
        <div className="flex flex-wrap justify-center mb-12">
          <ToggleButtonGroup
            value={activeCategory}
            onChange={setActiveCategory}
            options={categories}
          />
        </div>
        
        <div className="w-[1406px] mx-auto mt-8">
          <Collapsible 
            isOpen={isExpanded} 
            maxHeight="2000px"
            minHeight="192px"
            duration={0.7}
          >
            <div 
              key={activeCategory} 
              className="flex flex-wrap justify-center gap-8 py-6"
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
                      <Text 
                        size={TextSize.XL} 
                        variant={TextVariant.ACCENT} 
                        weight={TextWeight.BOLD}
                      >
                        &lt;/&gt;
                      </Text>
                    )}
                  </div>
                  <Text 
                    size={TextSize.XS} 
                    variant={TextVariant.MUTED} 
                    weight={TextWeight.MEDIUM}
                    hover
                  >
                    {tech.name}
                  </Text>
                </div>
              ))}
            </div>
          </Collapsible>
        
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
