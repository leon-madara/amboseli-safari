/**
 * Chapter Configuration Data
 * Defines all 12 chapters of the cinematic safari homepage
 */

import { ChapterConfig } from '@/types/chapter';
import dynamic from 'next/dynamic';

// Dynamically import chapter components for code splitting
const PreDawnHero = dynamic(() => import('@/components/chapters/PreDawnHero/PreDawnHero'));
const SunriseChapter = dynamic(() => import('@/components/chapters/SunriseChapter/SunriseChapter'));
const MorningDriveChapter = dynamic(() => import('@/components/chapters/MorningDriveChapter/MorningDriveChapter'));
const BushBreakfastChapter = dynamic(() => import('@/components/chapters/BushBreakfastChapter/BushBreakfastChapter'));
const AccommodationsChapter = dynamic(() => import('@/components/chapters/AccommodationsChapter/AccommodationsChapter'));
const DiningChapter = dynamic(() => import('@/components/chapters/DiningChapter/DiningChapter'));
const ExperiencesChapter = dynamic(() => import('@/components/chapters/ExperiencesChapter/ExperiencesChapter'));
const WellnessChapter = dynamic(() => import('@/components/chapters/WellnessChapter/WellnessChapter'));
const GuestStoriesChapter = dynamic(() => import('@/components/chapters/GuestStoriesChapter/GuestStoriesChapter'));
const LocationChapter = dynamic(() => import('@/components/chapters/LocationChapter/LocationChapter'));

/**
 * Complete configuration for all 12 chapters
 * Each chapter represents a phase of the safari day experience
 */
export const CHAPTER_CONFIGS: ChapterConfig[] = [
  {
    id: 'pre-dawn',
    number: 1,
    title: 'Pre-Dawn Hero',
    timeOfDay: 'pre-dawn',
    heightVh: 100,
    startVh: 0,
    endVh: 100,
    component: PreDawnHero,
    atmosphericEffects: {
      particles: 'stars',
      colorGradient: ['#0a0e27', '#1a1f3a'],
    },
  },
  {
    id: 'sunrise',
    number: 2,
    title: 'Sunrise',
    timeOfDay: 'dawn',
    heightVh: 100,
    startVh: 100,
    endVh: 200,
    component: SunriseChapter,
    atmosphericEffects: {
      colorGradient: ['#ff6b35', '#f7931e'],
    },
  },
  {
    id: 'morning-drive',
    number: 3,
    title: 'Morning Drive',
    timeOfDay: 'morning',
    heightVh: 150,
    startVh: 200,
    endVh: 350,
    component: MorningDriveChapter,
    atmosphericEffects: {
      particles: 'dust',
      colorGradient: ['#ffd89b', '#19547b'],
      cursor: 'binoculars',
    },
  },
  {
    id: 'bush-breakfast',
    number: 4,
    title: 'Bush Breakfast',
    timeOfDay: 'morning',
    heightVh: 150,
    startVh: 350,
    endVh: 500,
    component: BushBreakfastChapter,
    atmosphericEffects: {
      colorGradient: ['#f5af19', '#f12711'],
    },
  },
  {
    id: 'accommodations',
    number: 5,
    title: 'Accommodations',
    timeOfDay: 'midday',
    heightVh: 200,
    startVh: 500,
    endVh: 700,
    component: AccommodationsChapter,
    atmosphericEffects: {
      colorGradient: ['#87ceeb', '#f0e68c'],
    },
  },
  {
    id: 'dining',
    number: 6,
    title: 'Dining Experience',
    timeOfDay: 'afternoon',
    heightVh: 150,
    startVh: 700,
    endVh: 850,
    component: DiningChapter,
    atmosphericEffects: {
      colorGradient: ['#ffa500', '#ff6347'],
    },
  },
  {
    id: 'experiences',
    number: 7,
    title: 'Safari Experiences',
    timeOfDay: 'golden-hour',
    heightVh: 250,
    startVh: 850,
    endVh: 1100,
    component: ExperiencesChapter,
    atmosphericEffects: {
      colorGradient: ['#ff8c00', '#ff4500'],
    },
  },
  {
    id: 'wellness',
    number: 8,
    title: 'Wellness Moment',
    timeOfDay: 'sunset',
    heightVh: 150,
    startVh: 1100,
    endVh: 1250,
    component: WellnessChapter,
    atmosphericEffects: {
      colorGradient: ['#ff7e5f', '#feb47b'],
    },
  },
  {
    id: 'guest-stories',
    number: 9,
    title: 'Guest Stories',
    timeOfDay: 'dusk',
    heightVh: 200,
    startVh: 1250,
    endVh: 1450,
    component: GuestStoriesChapter,
    atmosphericEffects: {
      particles: 'fireflies',
      colorGradient: ['#ee9ca7', '#ffdde1'],
    },
  },
  {
    id: 'location',
    number: 10,
    title: 'Location & Access',
    timeOfDay: 'twilight',
    heightVh: 150,
    startVh: 1450,
    endVh: 1600,
    component: LocationChapter,
    atmosphericEffects: {
      colorGradient: ['#2c3e50', '#3498db'],
    },
  },
  {
    id: 'journal',
    number: 11,
    title: 'Safari Journal',
    timeOfDay: 'twilight',
    heightVh: 150,
    startVh: 1600,
    endVh: 1750,
    component: null as any,
    atmosphericEffects: {
      colorGradient: ['#34495e', '#2c3e50'],
    },
  },
  {
    id: 'plan-safari',
    number: 12,
    title: 'Plan Your Safari',
    timeOfDay: 'night',
    heightVh: 150,
    startVh: 1750,
    endVh: 1900,
    component: null as any,
    atmosphericEffects: {
      particles: 'stars',
      colorGradient: ['#0f2027', '#203a43'],
    },
  },
];

/**
 * Get chapter configuration by ID
 */
export function getChapterById(id: string): ChapterConfig | undefined {
  return CHAPTER_CONFIGS.find((chapter) => chapter.id === id);
}

/**
 * Get chapter configuration by scroll position (in vh)
 */
export function getChapterByScrollPosition(scrollVh: number): ChapterConfig | undefined {
  return CHAPTER_CONFIGS.find(
    (chapter) => scrollVh >= chapter.startVh && scrollVh < chapter.endVh
  );
}

/**
 * Get the next chapter after the given chapter ID
 */
export function getNextChapter(currentId: string): ChapterConfig | undefined {
  const currentIndex = CHAPTER_CONFIGS.findIndex((chapter) => chapter.id === currentId);
  if (currentIndex === -1 || currentIndex === CHAPTER_CONFIGS.length - 1) {
    return undefined;
  }
  return CHAPTER_CONFIGS[currentIndex + 1];
}

/**
 * Get the previous chapter before the given chapter ID
 */
export function getPreviousChapter(currentId: string): ChapterConfig | undefined {
  const currentIndex = CHAPTER_CONFIGS.findIndex((chapter) => chapter.id === currentId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return CHAPTER_CONFIGS[currentIndex - 1];
}

/**
 * Total height of all chapters in vh
 */
export const TOTAL_JOURNEY_HEIGHT_VH = 1900;
