import { Tag } from '../../../../design-system/components';
import type { SkillsChipsProps } from './SkillsChips.types';

export function SkillsChips({ technologies }: SkillsChipsProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {technologies.map(tech => (
          <Tag 
            key={tech.name}
            className="flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg transition-all hover:scale-105"
          >
            {tech.icon && (
              <img 
                src={tech.icon} 
                alt={tech.name}
                className="w-6 h-6 object-contain"
              />
            )}
            <span className="whitespace-nowrap">
              {tech.name}
            </span>
          </Tag>
        ))}
      </div>
    </div>
  );
}
