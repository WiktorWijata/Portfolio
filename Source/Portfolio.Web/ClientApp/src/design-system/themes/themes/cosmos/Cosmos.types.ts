import type { DynamicBackgroundComponent } from "../DynamicBackground.types";

export interface Star {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  size: number;
  duration: number;
  delay: number;
  depth: number;
  speedX: number;
  speedY: number;
}

export interface Comet {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  tailLength: number;
}
  
export const CosmosVariant = {
  STARS_WITH_COMETS: 'stars',
  STARS: 'particles',
  MINIMAL: 'minimal'
} as const;

export type CosmosVariant = typeof CosmosVariant[keyof typeof CosmosVariant];

export interface CosmosProps extends DynamicBackgroundComponent {
  variant?: CosmosVariant;
}