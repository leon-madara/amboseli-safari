/**
 * Chapter Type Definitions
 * Core types for the cinematic safari homepage experience
 */

import { ComponentType } from 'react';

/**
 * Time of day categories for atmospheric styling
 */
export type TimeOfDay =
  | 'pre-dawn'
  | 'dawn'
  | 'morning'
  | 'midday'
  | 'afternoon'
  | 'golden-hour'
  | 'sunset'
  | 'dusk'
  | 'twilight'
  | 'night';

/**
 * Base props that all chapter components receive
 */
export interface BaseChapterProps {
  id: string;
  className?: string;
}

/**
 * Call-to-action button configuration
 */
export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

/**
 * Atmospheric effects configuration for chapters
 */
export interface AtmosphericEffects {
  particles?: 'dust' | 'fireflies' | 'stars';
  colorGradient: [string, string];
  cursor?: 'binoculars' | 'default';
}

/**
 * Complete chapter configuration
 */
export interface ChapterConfig {
  id: string;
  number: number;
  title: string;
  timeOfDay: TimeOfDay;
  heightVh: number;
  startVh: number;
  endVh: number;
  component: ComponentType<BaseChapterProps>;
  atmosphericEffects?: AtmosphericEffects;
}

/**
 * Chapter progress tracking
 */
export interface ChapterProgress {
  chapterId: string;
  progress: number; // 0-100
  isActive: boolean;
  isComplete: boolean;
}
