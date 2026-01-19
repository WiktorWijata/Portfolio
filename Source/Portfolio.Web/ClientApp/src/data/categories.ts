import type { Category } from '../components/Skills/components/SkillsFilter/SkillsFilter.types';

export interface CategoryOption {
  value: Category;
  label: string;
}

export const categories: CategoryOption[] = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'design', label: 'Design' },
  { value: 'others', label: 'Inne' }
];
