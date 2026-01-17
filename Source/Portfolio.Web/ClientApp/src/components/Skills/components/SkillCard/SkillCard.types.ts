export interface SkillCardProps {
  name: string;
  icon: string;
  index: number;
  isVisible: boolean;
}

export const SKILL_CARD_CONFIG = {
  STAGGER_DELAY: 0.05,
  ANIMATION_DURATION: 0.4,
  BACKDROP_BLUR: '8px'
} as const;
