import { ToggleButtonGroup } from '../../../../design-system/components';
import { categories } from '../../../../data';
import type { SkillsFilterProps } from './SkillsFilter.types';

export function SkillsFilter({ 
  activeCategory, 
  onCategoryChange 
}: SkillsFilterProps) {
  return (
    <div className="flex justify-center mb-12">
      <ToggleButtonGroup
        value={activeCategory}
        onChange={onCategoryChange}
        options={categories}
      />
    </div>
  );
}
