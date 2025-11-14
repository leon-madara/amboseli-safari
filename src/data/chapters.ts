/**
 * Chapter Configuration Data
 * Defines the streamlined 8-chapter cinematic safari homepage
 * Optimized for engagement without overwhelming users
 */

import { ChapterConfig } from '@/types/chapter';
import dynamic from 'next/dynamic';

// Dynamically import chapter components for code splitting
const PreDawnHero = dynamic(() => import('@/components/chapters/PreDawnHero/PreDawnHero'));
const SunriseChapter = dynamic(() => import('@/components/chapters/SunriseChapter/SunriseChapter'));
const MorningDriveChapter = dynamic(() => import('@/components/chapters/MorningDriveChapter/MorningDriveChapter'));
const AccommodationsChapter = dynamic(() => import('@/components/chapters/AccommodationsChapter/AccommodationsChapter'));
const DiningChapter = dynamic(() => import('@/components/chapters/DiningChapter/DiningChapter'));
const ExperiencesChapter = dynamic(() => import('@/components/chapters/ExperiencesChapter/ExperiencesChapter'));
const LocationChapter = dynamic(() => import('@/components/chapters/LocationChapter/LocationChapter'));
const PlanSafariChapter = dynamic(() => import('@/components/chapters/PlanSafariChapter/PlanSafariChapter'));

/**
 * Streamlined configuration for 8 essential chapters
 * Total journey: ~1,100vh (optimized for engagement and conversion)
 */
export const CHAPTER_CONFIGS: ChapterConfig[] = [
  {
    id: 'pre-dawn',
    number: 1,
    title: 'Opening December 2025',
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
    title: 'Our Vision',
    timeOfDay: 'dawn',
    heightVh: 120,
    startVh: 100,
    endVh: 220,
    component: SunriseChapter,
    atmosphericEffects: {
      colorGradient: ['#ff6b35', '#f7931e'],
    },
  },
  {
    id: 'morning-drive',
    number: 3,
    title: 'Wildlife Experience',
    timeOfDay: 'morning',
    heightVh: 130,
    startVh: 220,
    endVh: 350,
    component: MorningDriveChapter,
    atmosphericEffects: {
      particles: 'dust',
      colorGradient: ['#ffd89b', '#19547b'],
      cursor: 'binoculars',
    },
  },
  {
    id: 'accommodations',
    number: 4,
    title: 'Your Rooms',
    timeOfDay: 'midday',
    heightVh: 150,
    startVh: 350,
    endVh: 500,
    component: AccommodationsChapter,
    atmosphericEffects: {
      colorGradient: ['#87ceeb', '#f0e68c'],
    },
  },
  {
    id: 'dining',
    number: 5,
    title: 'Dining & Pool',
    timeOfDay: 'afternoon',
    heightVh: 150,
    startVh: 500,
    endVh: 650,
    component: DiningChapter,
    atmosphericEffects: {
      colorGradient: ['#ffa500', '#ff6347'],
    },
  },
  {
    id: 'experiences',
    number: 6,
    title: 'Safari Adventures',
    timeOfDay: 'golden-hour',
    heightVh: 150,
    startVh: 650,
    endVh: 800,
    component: ExperiencesChapter,
    atmosphericEffects: {
      colorGradient: ['#ff8c00', '#ff4500'],
    },
  },
  {
    id: 'location',
    number: 7,
    title: 'Getting Here',
    timeOfDay: 'twilight',
    heightVh: 120,
    startVh: 800,
    endVh: 920,
    component: LocationChapter,
    atmosphericEffects: {
      colorGradient: ['#2c3e50', '#3498db'],
    },
  },
  {
    id: 'plan-safari',
    number: 8,
    title: 'Reserve Your Stay',
    timeOfDay: 'night',
    heightVh: 180,
    startVh: 920,
    endVh: 1100,
    component: PlanSafariChapter,
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
 * Streamlined from 1,900vh to 1,100vh for optimal engagement
 */
export const TOTAL_JOURNEY_HEIGHT_VH = 1100;
