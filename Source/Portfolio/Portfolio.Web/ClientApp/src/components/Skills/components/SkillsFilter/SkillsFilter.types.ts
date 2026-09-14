export type Category = string;

export interface SkillsFilterProps {
  categories: { value: Category; label: string }[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}
