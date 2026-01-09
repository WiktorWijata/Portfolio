import { useState } from 'react';

interface Technology {
  name: string;
  icon: string;
  category: string;
}

type Category = 'all' | 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'others';

function Skills() {
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

  const technologies: Technology[] = [
    { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', category: 'backend' },
    { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg', category: 'backend' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'frontend' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'frontend' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'frontend' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'frontend' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'frontend' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', category: 'frontend' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend' },
    { name: 'Blazor', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blazor/blazor-original.svg', category: 'frontend' },
    { name: 'Aurelia', icon: '', category: 'frontend' },
    { name: 'Knockout', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/knockout/knockout-plain-wordmark.svg', category: 'frontend' },
    { name: 'WPF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg', category: 'frontend' },
    { name: 'WinForms', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg', category: 'frontend' },
    { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'mobile' },
    { name: 'Xamarin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg', category: 'mobile' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database' },
    { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'database' },
    { name: 'MSSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', category: 'database' },
    { name: 'Oracle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg', category: 'database' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'devops' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'devops' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'devops' },
    { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', category: 'devops' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'design' },
    { name: 'GIMP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gimp/gimp-original.svg', category: 'design' },
    { name: 'Visual Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg', category: 'others' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'others' },
    { name: 'Rider', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rider/rider-original.svg', category: 'others' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', category: 'others' }
  ];

  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);
    
  const hasMoreThanOneRow = filteredTechnologies.length > 7;

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span 
            style={{
              background: 'linear-gradient(to right, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Umiejętności i technologie
          </span>
        </h2>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded backdrop-blur-sm transition-all font-medium ${
                activeCategory === category.id ? 'text-gray-300' : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{
                border: `1px solid ${activeCategory === category.id ? 'rgba(168, 85, 247, 0.8)' : 'rgba(255, 248, 231, 0.15)'}`,
                backgroundColor: activeCategory === category.id ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255, 248, 231, 0.03)',
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
              className={`flex flex-col items-center gap-3 p-6 w-40 rounded-lg backdrop-blur-sm hover:scale-110 group transition-all duration-500 ${
                index >= 7 && !isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{ 
                border: '1px solid rgba(255, 248, 231, 0.15)',
                backgroundColor: 'rgba(255, 248, 231, 0.03)',
                animation: `fadeIn 0.4s ease-out ${index * 0.05}s both`
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
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              style={{
                border: '1px solid rgba(168, 85, 247, 0.4)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                color: '#e9d5ff',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
              }}
            >
              {isExpanded ? 'Pokaż mniej' : 'Pokaż więcej'}
            </button>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
