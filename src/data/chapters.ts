/**
 * Chapter Configuration Data
 * Simplified 7-chapter cinematic safari journey
 * Optimized for engagement, conversion, and mobile experience
 */

import { ChapterConfig } from '@/types/chapter';
import dynamic from 'next/dynamic';

// Import PreDawnHero directly for immediate loading (no lazy loading)
import PreDawnHero from '@/components/chapters/PreDawnHero/PreDawnHero';

// Dynamically import other chapter components for code splitting
const MorningDriveChapter = dynamic(() => import('@/components/chapters/MorningDriveChapter/MorningDriveChapter'));
const WildlifeEncountersChapter = dynamic(() => import('@/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter'));
const AccommodationsChapter = dynamic(() => import('@/components/chapters/AccommodationsChapter/AccommodationsChapter'));
const DiningChapter = dynamic(() => import('@/components/chapters/DiningChapter/DiningChapter'));
const ExperiencesChapter = dynamic(() => import('@/components/chapters/ExperiencesChapter/ExperiencesChapter'));
const LocationChapter = dynamic(() => import('@/components/chapters/LocationChapter/LocationChapter'));
const PlanSafariChapter = dynamic(() => import('@/components/chapters/PlanSafariChapter/PlanSafariChapter'));

/**
 * Detect if viewport is mobile (< 768px width)
 * Used for adjusting chapter heights for mobile content layout
 */
const isMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Get chapter height adjusted for mobile devices
 * Mobile devices get 20% increased height for better content layout
 */
const getChapterHeight = (baseHeight: number): number => {
  return isMobileViewport() ? Math.round(baseHeight * 1.2) : baseHeight;
};

/**
 * Base chapter heights (desktop)
 * Mobile devices get 20% increase for better content layout
 * Reduced heights for shorter scroll journey
 */
const BASE_HEIGHTS = {
  preDawn: 100,
  morningDrive: 60,
  wildlifeEncounters: 160, // Updated for card stacking animation (was 80)
  accommodations: 80,
  dining: 80,
  experiences: 80,
  location: 80,
  contact: 80,
};

/**
 * Calculate chapter start and end positions based on heights
 */
const calculateChapterPositions = () => {
  const heights = {
    preDawn: getChapterHeight(BASE_HEIGHTS.preDawn),
    morningDrive: getChapterHeight(BASE_HEIGHTS.morningDrive),
    wildlifeEncounters: getChapterHeight(BASE_HEIGHTS.wildlifeEncounters),
    accommodations: getChapterHeight(BASE_HEIGHTS.accommodations),
    dining: getChapterHeight(BASE_HEIGHTS.dining),
    experiences: getChapterHeight(BASE_HEIGHTS.experiences),
    location: getChapterHeight(BASE_HEIGHTS.location),
    contact: getChapterHeight(BASE_HEIGHTS.contact),
  };

  let currentPosition = 0;
  const positions = {
    preDawn: { start: currentPosition, end: currentPosition + heights.preDawn },
    morningDrive: { start: currentPosition += heights.preDawn, end: currentPosition + heights.morningDrive },
    wildlifeEncounters: { start: currentPosition += heights.morningDrive, end: currentPosition + heights.wildlifeEncounters },
    accommodations: { start: currentPosition += heights.wildlifeEncounters, end: currentPosition + heights.accommodations },
    dining: { start: currentPosition += heights.accommodations, end: currentPosition + heights.dining },
    experiences: { start: currentPosition += heights.dining, end: currentPosition + heights.experiences },
    location: { start: currentPosition += heights.experiences, end: currentPosition + heights.location },
    contact: { start: currentPosition += heights.location, end: currentPosition + heights.contact },
  };

  return { heights, positions };
};

/**
 * Simplified 8-chapter configuration
 * Core safari journey: Dawn, Morning Drive, Wildlife Encounters, Accommodations, Dining, Experiences, Location, Contact
 * Optimized for pacing and engagement
 * Heights automatically adjust for mobile (20% increase)
 * Total: ~760vh desktop, ~912vh mobile
 */
export const CHAPTER_CONFIGS: ChapterConfig[] = (() => {
  const { heights, positions } = calculateChapterPositions();

  return [
    // Chapter 1: Dawn - Opening December 2025
    {
      id: 'pre-dawn',
      number: 1,
      title: 'Opening December 2025',
      timeOfDay: 'pre-dawn',
      heightVh: heights.preDawn,
      startVh: positions.preDawn.start,
      endVh: positions.preDawn.end,
      component: PreDawnHero,
      atmosphericEffects: {
        particles: 'stars',
        colorGradient: ['#0a0e27', '#1a1f3a'],
      },
    },
    // Chapter 2: Morning Drive - Wildlife Experience
    {
      id: 'morning-drive',
      number: 2,
      title: 'Wildlife Experience',
      timeOfDay: 'morning',
      heightVh: heights.morningDrive,
      startVh: positions.morningDrive.start,
      endVh: positions.morningDrive.end,
      component: MorningDriveChapter,
      atmosphericEffects: {
        particles: 'dust',
        colorGradient: ['#ffd89b', '#19547b'],
        cursor: 'binoculars',
      },
    },
    // Chapter 3: Wildlife Encounters - Meet the Magnificent Five
    {
      id: 'wildlife-encounters',
      number: 3,
      title: 'Meet the Magnificent Five',
      timeOfDay: 'morning',
      heightVh: heights.wildlifeEncounters,
      startVh: positions.wildlifeEncounters.start,
      endVh: positions.wildlifeEncounters.end,
      component: WildlifeEncountersChapter,
      atmosphericEffects: {
        colorGradient: ['#f5f1e8', '#d2bea0'],
      },
    },
    // Chapter 4: Accommodations - Your Rooms
    {
      id: 'accommodations',
      number: 4,
      title: 'Your Rooms',
      timeOfDay: 'midday',
      heightVh: heights.accommodations,
      startVh: positions.accommodations.start,
      endVh: positions.accommodations.end,
      component: AccommodationsChapter,
      atmosphericEffects: {
        colorGradient: ['#87ceeb', '#f0e68c'],
      },
    },
    // Chapter 5: Dining - Dining & Pool
    {
      id: 'dining',
      number: 5,
      title: 'Dining & Pool',
      timeOfDay: 'afternoon',
      heightVh: heights.dining,
      startVh: positions.dining.start,
      endVh: positions.dining.end,
      component: DiningChapter,
      atmosphericEffects: {
        colorGradient: ['#ffa500', '#ff6347'],
      },
    },
    // Chapter 6: Experiences - Safari Adventures
    {
      id: 'experiences',
      number: 6,
      title: 'Safari Adventures',
      timeOfDay: 'golden-hour',
      heightVh: heights.experiences,
      startVh: positions.experiences.start,
      endVh: positions.experiences.end,
      component: ExperiencesChapter,
      atmosphericEffects: {
        colorGradient: ['#ff8c00', '#ff4500'],
      },
    },
    // Chapter 7: Location - Getting Here
    {
      id: 'location',
      number: 7,
      title: 'Getting Here',
      timeOfDay: 'twilight',
      heightVh: heights.location,
      startVh: positions.location.start,
      endVh: positions.location.end,
      component: LocationChapter,
      atmosphericEffects: {
        colorGradient: ['#2c3e50', '#3498db'],
      },
    },
    // Chapter 8: Contact - Reserve Your Stay
    {
      id: 'contact',
      number: 8,
      title: 'Reserve Your Stay',
      timeOfDay: 'night',
      heightVh: heights.contact,
      startVh: positions.contact.start,
      endVh: positions.contact.end,
      component: PlanSafariChapter,
      atmosphericEffects: {
        particles: 'stars',
        colorGradient: ['#0f2027', '#203a43'],
      },
    },
  ];
})();

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
 * Automatically adjusts for mobile (20% increase)
 * Desktop: 760vh, Mobile: 912vh
 */
export const TOTAL_JOURNEY_HEIGHT_VH = CHAPTER_CONFIGS.reduce(
  (total, chapter) => total + chapter.heightVh,
  0
);
