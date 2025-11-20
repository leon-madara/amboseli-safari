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
const SunriseChapter = dynamic(() => import('@/components/chapters/SunriseChapter/SunriseChapter'));
const MorningDriveChapter = dynamic(() => import('@/components/chapters/MorningDriveChapter/MorningDriveChapter'));
const BushBreakfastChapter = dynamic(() => import('@/components/chapters/BushBreakfastChapter/BushBreakfastChapter'));
const WildlifeEncountersChapter = dynamic(() => import('@/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter'));
const AccommodationsChapter = dynamic(() => import('@/components/chapters/AccommodationsChapter/AccommodationsChapter'));
const DiningChapter = dynamic(() => import('@/components/chapters/DiningChapter/DiningChapter'));
const ExperiencesChapter = dynamic(() => import('@/components/chapters/ExperiencesChapter/ExperiencesChapter'));
const WellnessChapter = dynamic(() => import('@/components/chapters/WellnessChapter/WellnessChapter'));
const GuestStoriesChapter = dynamic(() => import('@/components/chapters/GuestStoriesChapter/GuestStoriesChapter'));
const JournalChapter = dynamic(() => import('@/components/chapters/JournalChapter/JournalChapter'));
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
 * Expanded 12-chapter cinematic journey
 */
const BASE_HEIGHTS = {
  preDawn: 100,
  sunrise: 100,
  morningDrive: 100,
  bushBreakfast: 100,
  wildlifeEncounters: 100,
  accommodations: 100,
  dining: 100,
  experiences: 100,
  wellness: 100,
  guestStories: 150,
  journal: 150,
  location: 100,
  contact: 150,
};

/**
 * Calculate chapter start and end positions based on heights
 */
const calculateChapterPositions = () => {
  const heights = {
    preDawn: getChapterHeight(BASE_HEIGHTS.preDawn),
    sunrise: getChapterHeight(BASE_HEIGHTS.sunrise),
    morningDrive: getChapterHeight(BASE_HEIGHTS.morningDrive),
    bushBreakfast: getChapterHeight(BASE_HEIGHTS.bushBreakfast),
    wildlifeEncounters: getChapterHeight(BASE_HEIGHTS.wildlifeEncounters),
    accommodations: getChapterHeight(BASE_HEIGHTS.accommodations),
    dining: getChapterHeight(BASE_HEIGHTS.dining),
    experiences: getChapterHeight(BASE_HEIGHTS.experiences),
    wellness: getChapterHeight(BASE_HEIGHTS.wellness),
    guestStories: getChapterHeight(BASE_HEIGHTS.guestStories),
    journal: getChapterHeight(BASE_HEIGHTS.journal),
    location: getChapterHeight(BASE_HEIGHTS.location),
    contact: getChapterHeight(BASE_HEIGHTS.contact),
  };

  let currentPosition = 0;
  const positions = {
    preDawn: { start: currentPosition, end: currentPosition + heights.preDawn },
    sunrise: { start: currentPosition += heights.preDawn, end: currentPosition + heights.sunrise },
    morningDrive: { start: currentPosition += heights.sunrise, end: currentPosition + heights.morningDrive },
    bushBreakfast: { start: currentPosition += heights.morningDrive, end: currentPosition + heights.bushBreakfast },
    wildlifeEncounters: { start: currentPosition += heights.bushBreakfast, end: currentPosition + heights.wildlifeEncounters },
    accommodations: { start: currentPosition += heights.wildlifeEncounters, end: currentPosition + heights.accommodations },
    dining: { start: currentPosition += heights.accommodations, end: currentPosition + heights.dining },
    experiences: { start: currentPosition += heights.dining, end: currentPosition + heights.experiences },
    wellness: { start: currentPosition += heights.experiences, end: currentPosition + heights.wellness },
    guestStories: { start: currentPosition += heights.wellness, end: currentPosition + heights.guestStories },
    journal: { start: currentPosition += heights.guestStories, end: currentPosition + heights.journal },
    location: { start: currentPosition += heights.journal, end: currentPosition + heights.location },
    contact: { start: currentPosition += heights.location, end: currentPosition + heights.contact },
  };

  return { heights, positions };
};

/**
 * Expanded 12-chapter cinematic configuration
 * Complete safari journey from pre-dawn to booking
 * Optimized for engagement, pacing, and conversion
 * Heights automatically adjust for mobile (20% increase)
 * Total: ~1450vh desktop, ~1740vh mobile
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
    // Chapter 2: Sunrise - Golden Hour Awakening
    {
      id: 'sunrise',
      number: 2,
      title: 'Golden Hour Awakening',
      timeOfDay: 'sunrise',
      heightVh: heights.sunrise,
      startVh: positions.sunrise.start,
      endVh: positions.sunrise.end,
      component: SunriseChapter,
      atmosphericEffects: {
        colorGradient: ['#ffd89b', '#ff6b35'],
      },
    },
    // Chapter 3: Morning Drive - Wildlife Experience
    {
      id: 'morning-drive',
      number: 3,
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
    // Chapter 4: Bush Breakfast - Savannah Dining
    {
      id: 'bush-breakfast',
      number: 4,
      title: 'Savannah Dining',
      timeOfDay: 'morning',
      heightVh: heights.bushBreakfast,
      startVh: positions.bushBreakfast.start,
      endVh: positions.bushBreakfast.end,
      component: BushBreakfastChapter,
      atmosphericEffects: {
        colorGradient: ['#f5d76e', '#e8c547'],
      },
    },
    // Chapter 5: Wildlife Encounters - Meet the Magnificent Five
    {
      id: 'wildlife-encounters',
      number: 5,
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
    // Chapter 6: Accommodations - Your Rooms
    {
      id: 'accommodations',
      number: 6,
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
    // Chapter 7: Dining - Dining & Pool
    {
      id: 'dining',
      number: 7,
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
    // Chapter 8: Experiences - Safari Adventures
    {
      id: 'experiences',
      number: 8,
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
    // Chapter 9: Wellness - Spa & Relaxation
    {
      id: 'wellness',
      number: 9,
      title: 'Spa & Relaxation',
      timeOfDay: 'afternoon',
      heightVh: heights.wellness,
      startVh: positions.wellness.start,
      endVh: positions.wellness.end,
      component: WellnessChapter,
      atmosphericEffects: {
        colorGradient: ['#e8d5c4', '#c9b8a8'],
      },
    },
    // Chapter 10: Guest Stories - Stories from the Savannah
    {
      id: 'guest-stories',
      number: 10,
      title: 'Stories from the Savannah',
      timeOfDay: 'dusk',
      heightVh: heights.guestStories,
      startVh: positions.guestStories.start,
      endVh: positions.guestStories.end,
      component: GuestStoriesChapter,
      atmosphericEffects: {
        particles: 'fireflies',
        colorGradient: ['#ee9ca7', '#ffdde1'],
      },
    },
    // Chapter 11: Journal - Safari Journal & Conservation
    {
      id: 'journal',
      number: 11,
      title: 'Safari Journal & Conservation',
      timeOfDay: 'twilight',
      heightVh: heights.journal,
      startVh: positions.journal.start,
      endVh: positions.journal.end,
      component: JournalChapter,
      atmosphericEffects: {
        colorGradient: ['#34495e', '#2c3e50'],
      },
    },
    // Chapter 12: Location - Getting Here
    {
      id: 'location',
      number: 12,
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
    // Chapter 13: Contact - Reserve Your Stay
    {
      id: 'contact',
      number: 13,
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
 * Desktop: 3390vh, Mobile: 4068vh
 */
export const TOTAL_JOURNEY_HEIGHT_VH = CHAPTER_CONFIGS.reduce(
  (total, chapter) => total + chapter.heightVh,
  0
);
