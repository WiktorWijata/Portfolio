export type Category = 'all' | 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'others';

export interface SkillsFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}
