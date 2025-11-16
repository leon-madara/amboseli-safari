/**
 * Chapter Configuration Data
 * Streamlined 9-chapter cinematic safari homepage
 * Optimized for engagement, conversion, and mobile experience
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
const LocationChapter = dynamic(() => import('@/components/chapters/LocationChapter/LocationChapter'));
const PlanSafariChapter = dynamic(() => import('@/components/chapters/PlanSafariChapter/PlanSafariChapter'));

/**
 * Streamlined 9-chapter configuration
 * Optimized for brevity, conversion, and mobile experience
 * Total: ~960vh (reduced from 1,820vh for better engagement)
 */
export const CHAPTER_CONFIGS: ChapterConfig[] = [
  // Chapter 1: Opening December 2025 (80vh)
  {
    id: 'pre-dawn',
    number: 1,
    title: 'Opening December 2025',
    timeOfDay: 'pre-dawn',
    heightVh: 80,
    startVh: 0,
    endVh: 80,
    component: PreDawnHero,
    atmosphericEffects: {
      particles: 'stars',
      colorGradient: ['#0a0e27', '#1a1f3a'],
    },
  },
  // Chapter 2: Our Vision (90vh)
  {
    id: 'sunrise',
    number: 2,
    title: 'Our Vision',
    timeOfDay: 'dawn',
    heightVh: 90,
    startVh: 80,
    endVh: 170,
    component: SunriseChapter,
    atmosphericEffects: {
      colorGradient: ['#ff6b35', '#f7931e'],
    },
  },
  // Chapter 3: Wildlife Experience (110vh)
  {
    id: 'morning-drive',
    number: 3,
    title: 'Wildlife Experience',
    timeOfDay: 'morning',
    heightVh: 110,
    startVh: 170,
    endVh: 280,
    component: MorningDriveChapter,
    atmosphericEffects: {
      particles: 'dust',
      colorGradient: ['#ffd89b', '#19547b'],
      cursor: 'binoculars',
    },
  },
  // Chapter 4: Bush Breakfast (110vh) - USER PRIORITY: Keep storytelling
  {
    id: 'bush-breakfast',
    number: 4,
    title: 'Bush Breakfast',
    timeOfDay: 'morning',
    heightVh: 110,
    startVh: 280,
    endVh: 390,
    component: BushBreakfastChapter,
    atmosphericEffects: {
      colorGradient: ['#f5af19', '#f12711'],
    },
  },
  // Chapter 5: Your Rooms (120vh)
  {
    id: 'accommodations',
    number: 5,
    title: 'Your Rooms',
    timeOfDay: 'midday',
    heightVh: 120,
    startVh: 390,
    endVh: 510,
    component: AccommodationsChapter,
    atmosphericEffects: {
      colorGradient: ['#87ceeb', '#f0e68c'],
    },
  },
  // Chapter 6: Dining & Pool (120vh) - Combined amenities
  {
    id: 'dining',
    number: 6,
    title: 'Dining & Pool',
    timeOfDay: 'afternoon',
    heightVh: 120,
    startVh: 510,
    endVh: 630,
    component: DiningChapter,
    atmosphericEffects: {
      colorGradient: ['#ffa500', '#ff6347'],
    },
  },
  // Chapter 7: Safari Adventures (120vh)
  {
    id: 'experiences',
    number: 7,
    title: 'Safari Adventures',
    timeOfDay: 'golden-hour',
    heightVh: 120,
    startVh: 630,
    endVh: 750,
    component: ExperiencesChapter,
    atmosphericEffects: {
      colorGradient: ['#ff8c00', '#ff4500'],
    },
  },
  // Chapter 8: Getting Here (120vh) - Enhanced with interactive map
  {
    id: 'location',
    number: 8,
    title: 'Getting Here',
    timeOfDay: 'twilight',
    heightVh: 120,
    startVh: 750,
    endVh: 870,
    component: LocationChapter,
    atmosphericEffects: {
      colorGradient: ['#2c3e50', '#3498db'],
    },
  },
  // Chapter 9: Reserve Your Stay (120vh) - Conversion focus
  {
    id: 'plan-safari',
    number: 9,
    title: 'Reserve Your Stay',
    timeOfDay: 'night',
    heightVh: 120,
    startVh: 870,
    endVh: 990,
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
 * Optimized from 1,820vh to 990vh (46% reduction)
 */
export const TOTAL_JOURNEY_HEIGHT_VH = 990;
