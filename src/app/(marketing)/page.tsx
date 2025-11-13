import { CinematicJourney } from '@/components/organisms/CinematicJourney';
import { ScrollProgressIndicator } from '@/components/molecules/ScrollProgressIndicator';
import { StickyNavigation } from '@/components/molecules/StickyNavigation';
import { WhatsAppChatBubble } from '@/components/molecules/WhatsAppChatBubble';
import { ScrollProgress } from '@/components/organisms/ScrollProgress';

/**
 * HomePage Component
 * 
 * The main landing page featuring the cinematic safari journey experience.
 * Integrates all 12 chapters with persistent navigation and progress tracking.
 * 
 * Features:
 * - CinematicJourney: 12-chapter scroll-driven storytelling experience
 * - ScrollProgressIndicator: Visual progress bar with chapter navigation
 * - StickyNavigation: Auto-hiding navigation bar after hero section
 * - WhatsAppChatBubble: Instant communication channel
 * 
 * Requirements: 1.1, 1.4, 1.5, 15.1, 15.2, 15.3, 15.4, 15.5
 */
export default function HomePage() {
  return (
    <main>
      {/* Main cinematic journey with all 12 chapters */}
      <CinematicJourney />

      {/* Persistent UI elements */}
      <ScrollProgress />
      <ScrollProgressIndicator position="right" />
      <StickyNavigation showAfterVh={100} />
      <WhatsAppChatBubble
        phoneNumber="254712345678"
        message="Hi! I'd like to inquire about safari experiences at Amboseli Safari Club."
      />
    </main>
  );
}
