import { useState } from 'react';
import { Tag, CircularProgress } from '../../../../design-system/components';
import { useTheme } from '../../../../design-system/themes';
import { getSkillIcon } from '../../utils/getSkillIcon';
import type { SkillsChipsProps } from './SkillsChips.types';

export function SkillsChips({ technologies }: SkillsChipsProps) {
  const { currentTheme } = useTheme();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set(technologies.map((_, i) => `${i}`)));

  const handleImageError = (techKey: string, index: number) => {
    setImageErrors(prev => new Set(prev).add(techKey));
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(`${index}`);
      return newSet;
    });
  };

  const handleImageLoad = (index: number, element: HTMLImageElement) => {
    element.style.display = 'block';
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(`${index}`);
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {technologies.map((tech, index) => {
          const iconUrl = getSkillIcon(tech.name, tech.icon);
          const techKey = `${tech.name}-${tech.category}-${index}`;
          const hasError = imageErrors.has(techKey);
          const isLoading = imageLoading.has(`${index}`);
          
          return (
            <Tag 
              key={techKey}
              className="flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg transition-all hover:scale-105"
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                {isLoading && !hasError && (
                  <CircularProgress size="sm" />
                )}
                {!hasError && (
                  <img 
                    src={iconUrl} 
                    alt={tech.name}
                    className="w-6 h-6 object-contain absolute"
                    onError={() => handleImageError(techKey, index)}
                    style={{ display: 'none' }}
                    onLoad={(e) => handleImageLoad(index, e.currentTarget)}
                  />
                )}
                {hasError && (
                  <span 
                    className="text-lg font-bold"
                    style={{ color: currentTheme.colors.primary.borderHover }}
                  >
                    &lt;/&gt;
                  </span>
                )}
              </div>
              <span className="whitespace-nowrap">
                {tech.name}
              </span>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
