import { CinematicJourney } from '@/components/organisms/CinematicJourney';
import { ScrollProgressIndicator } from '@/components/molecules/ScrollProgressIndicator';
import { StickyNavigation } from '@/components/molecules/StickyNavigation';
import { WhatsAppChatBubble } from '@/components/molecules/WhatsAppChatBubble';

/**
 * HomePage Component
 *
 * The main landing page featuring the cinematic safari journey experience.
 * Streamlined 9-chapter journey optimized for engagement and conversion.
 *
 * Features:
 * - CinematicJourney: 9-chapter scroll-driven storytelling experience (~960vh)
 * - ScrollProgressIndicator: Visual progress bar with chapter navigation
 * - StickyNavigation: Auto-hiding navigation bar after hero section
 * - WhatsAppChatBubble: Instant communication channel
 * - Pre-launch countdown timer to December 2025
 *
 * Journey Chapters (960vh total):
 * 1. Opening December 2025 - 80vh (Hero + countdown)
 * 2. Our Vision - 90vh (Vision statement)
 * 3. Wildlife Experience - 110vh (Safari moments)
 * 4. Bush Breakfast - 110vh (Unique experience)
 * 5. Your Rooms - 120vh (Accommodations)
 * 6. Dining & Pool - 120vh (Amenities)
 * 7. Safari Adventures - 120vh (Activities)
 * 8. Getting Here - 90vh (Location access)
 * 9. Reserve Your Stay - 120vh (Conversion focus)
 *
 * Requirements: 1.1, 1.4, 1.5, 15.1, 15.2, 15.3, 15.4, 15.5
 */
export default function HomePage() {
  return (
    <main>
      {/* Streamlined 9-chapter cinematic journey (960vh total) */}
      <CinematicJourney />

      {/* Persistent UI elements */}
      <ScrollProgressIndicator position="right" />
      <StickyNavigation showAfterVh={80} />
      <WhatsAppChatBubble
        phoneNumber="254712345678"
        message="Hi! I'd like to inquire about safari experiences at Amboseli Safari Club."
      />
    </main>
  );
}
