import { ExperienceType } from '@/types/experience';

export type ChapterType = 'dawn' | 'midday' | 'sunset' | 'night';

export interface ChapterColorScheme {
  primary: string;
  secondary: string;
  text: string;
  gradient: string;
  badgeGradient: string;
}

export interface Chapter {
  id: ChapterType;
  title: string;
  time: string;
  description: string;
  icon: string;
  experiences: ExperienceType[];
  colorScheme: ChapterColorScheme;
}

// Map experience IDs to their appropriate chapters based on time of day
const experienceChapterMap: Record<string, ChapterType> = {
  '1': 'dawn',      // Sunrise Game Drive (5:30 AM)
  '6': 'dawn',      // Bird Watching Expedition (6:00 AM)
  '12': 'dawn',     // Bush Breakfast Experience (6:00 AM)
  '10': 'dawn',     // Hot Air Balloon Safari (5:00 AM)

  '2': 'midday',    // Full Day Safari Adventure (6:00 AM - 4:30 PM)
  '4': 'midday',    // Walking Safari with Maasai Guide (7:00 AM)
  '9': 'midday',    // Elephant Research Experience (7:00 AM)
  '8': 'midday',    // Maasai Village Cultural Visit (9:00 AM)
  '11': 'midday',   // Mountain Biking Safari (6:30 AM)

  '3': 'sunset',    // Sunset Safari Experience (3:30 PM)
  '7': 'sunset',    // Photography Safari Workshop (5:30 AM & 3:30 PM)

  '5': 'night',     // Night Game Drive (7:00 PM)
};

// Chapter configurations with color schemes
export const chapterConfigs: Record<ChapterType, Omit<Chapter, 'experiences'>> = {
  dawn: {
    id: 'dawn',
    title: 'Dawn Awakening',
    time: '5:30 AM - 8:00 AM',
    description: 'Experience the magic of sunrise as the savanna comes alive. The cool morning air and golden light create perfect conditions for wildlife viewing and photography.',
    icon: '🌅',
    colorScheme: {
      primary: '#FF7B54',
      secondary: '#FFB26B',
      text: '#3A3633',
      gradient: 'linear-gradient(180deg, #FF7B54 0%, #FFB26B 50%, #E8D5C4 100%)',
      badgeGradient: 'linear-gradient(135deg, #FF7B54 0%, #FFB26B 100%)',
    },
  },
  midday: {
    id: 'midday',
    title: 'Midday Adventures',
    time: '8:00 AM - 3:00 PM',
    description: 'Explore diverse experiences from cultural encounters to active safaris. The perfect time to immerse yourself in the rhythm of Amboseli life.',
    icon: '☀️',
    colorScheme: {
      primary: '#D4AF37',
      secondary: '#87CEEB',
      text: '#3A3633',
      gradient: 'linear-gradient(180deg, #87CEEB 0%, #D4AF37 100%)',
      badgeGradient: 'linear-gradient(135deg, #D4AF37 0%, #E6A04E 100%)',
    },
  },
  sunset: {
    id: 'sunset',
    title: 'Golden Hour',
    time: '3:30 PM - 7:00 PM',
    description: 'Witness the spectacular African sunset as wildlife becomes active in the cooling evening. The golden light transforms the landscape into a photographer\'s paradise.',
    icon: '🌇',
    colorScheme: {
      primary: '#C86F4D',
      secondary: '#CC8B3F',
      text: '#3A3633',
      gradient: 'linear-gradient(180deg, #C86F4D 0%, #CC8B3F 50%, #2D4A3E 100%)',
      badgeGradient: 'linear-gradient(135deg, #C86F4D 0%, #CC8B3F 100%)',
    },
  },
  night: {
    id: 'night',
    title: 'Nocturnal Wonders',
    time: '7:00 PM - 10:00 PM',
    description: 'Discover the mysterious world that awakens after dark. Experience the sounds and sights of nocturnal wildlife under the African stars.',
    icon: '🌙',
    colorScheme: {
      primary: '#16213e',
      secondary: '#0f3460',
      text: '#F3E9D7',
      gradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      badgeGradient: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
    },
  },
};

/**
 * Organizes experiences into time-based chapters
 */
export function organizeExperiencesByTime(experiences: ExperienceType[]): Chapter[] {
  // Initialize chapters with empty experience arrays
  const chapters: Record<ChapterType, Chapter> = {
    dawn: { ...chapterConfigs.dawn, experiences: [] },
    midday: { ...chapterConfigs.midday, experiences: [] },
    sunset: { ...chapterConfigs.sunset, experiences: [] },
    night: { ...chapterConfigs.night, experiences: [] },
  };

  // Distribute experiences to chapters
  experiences.forEach(experience => {
    const chapterType = experienceChapterMap[experience.id];
    if (chapterType && chapters[chapterType]) {
      chapters[chapterType].experiences.push(experience);
    }
  });

  // Return chapters in chronological order
  return [chapters.dawn, chapters.midday, chapters.sunset, chapters.night];
}

/**
 * Get chapter by ID
 */
export function getChapterById(chapterId: ChapterType): Omit<Chapter, 'experiences'> {
  return chapterConfigs[chapterId];
}

/**
 * Get chapter index (0-3)
 */
export function getChapterIndex(chapterId: ChapterType): number {
  const order: ChapterType[] = ['dawn', 'midday', 'sunset', 'night'];
  return order.indexOf(chapterId);
}

/**
 * Get next chapter ID (circular)
 */
export function getNextChapter(currentChapter: ChapterType): ChapterType {
  const order: ChapterType[] = ['dawn', 'midday', 'sunset', 'night'];
  const currentIndex = order.indexOf(currentChapter);
  const nextIndex = (currentIndex + 1) % order.length;
  return order[nextIndex];
}

/**
 * Get previous chapter ID (circular)
 */
export function getPreviousChapter(currentChapter: ChapterType): ChapterType {
  const order: ChapterType[] = ['dawn', 'midday', 'sunset', 'night'];
  const currentIndex = order.indexOf(currentChapter);
  const prevIndex = (currentIndex - 1 + order.length) % order.length;
  return order[prevIndex];
}
