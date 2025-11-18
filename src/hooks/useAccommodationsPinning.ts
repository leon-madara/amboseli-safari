'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook for GSAP ScrollTrigger pinning effect in AccommodationsChapter
 * 
 * Creates a pinned scroll experience with three room transitions:
 * - Phase 1 (0-33%): Room 1 entrance - both image and card slide up
 * - Phase 2 (33-66%): Room 1 → Room 2 transition - layout flips, content morphs
 * - Phase 3 (66-100%): Room 2 → Room 3 transition - layout flips back, content morphs
 * 
 * @returns sectionRef - Reference to attach to the section element
 * 
 * @example
 * ```tsx
 * const sectionRef = useAccommodationsPinning();
 * 
 * return (
 *   <section ref={sectionRef} className="accommodationsChapter">
 *     {/* Room content *\/}
 *   </section>
 * );
 * ```
 */
export function useAccommodationsPinning() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Function to check if viewport is mobile
    const checkIsMobile = () => window.innerWidth < 768;

    // Check for mobile viewport
    const isMobile = checkIsMobile();

    // Check for reduced motion preference using window.matchMedia
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Disable pinning and animations when reduced motion is preferred
    if (prefersReducedMotion) {
      // Kill all ScrollTrigger instances when reduced motion is detected
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
      
      // Reset all transforms to ensure content is visible and accessible
      gsap.set('.room-card, .room-image', {
        clearProps: 'all',
      });
      
      // Ensure all room content is visible and accessible
      gsap.set('.room-card .card-content, .room-image .image-content', {
        opacity: 1,
        scale: 1,
      });
      
      // Log for debugging (development only)
      if (process.env.NODE_ENV === 'development') {
        console.log('Reduced motion detected: GSAP pinning disabled');
      }
      
      return;
    }

    // Disable pinning on mobile (but keep simple animations if no reduced motion)
    if (isMobile) {
      // Simple vertical scroll with stagger animations for mobile
      // Animate room cards
      gsap.utils.toArray<HTMLElement>('.room-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });

      // Animate room images
      gsap.utils.toArray<HTMLElement>('.room-image').forEach((image) => {
        gsap.fromTo(
          image,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: image,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
      return;
    }

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Pin the entire section for 300vh
      ScrollTrigger.create({
        trigger: sectionRef.current, // Fixed: Use direct ref instead of class selector
        start: 'top top',
        end: '+=300vh', // Fixed: Pin for exactly 300vh (was +=300% which meant 900vh)
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        markers: false, // Set to true for debugging
      });

      // Set initial states for content that should be hidden
      gsap.set('.room-2-card .card-content', { opacity: 0, scale: 0.95 });
      gsap.set('.room-3-image .image-content', { opacity: 0, scale: 0.95 });
      gsap.set('.room-2-card .features li', { opacity: 0, x: -20 });
      gsap.set('.room-3-card .features li', { opacity: 0, x: -20 });

      // ===== PHASE 1: ROOM 1 ENTRANCE (0-33%) =====
      // Both image and card slide up from bottom simultaneously
      const room1Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // Fixed: Use direct ref instead of class selector
          start: 'top top',
          end: '+=100vh',
          scrub: 1,
        },
      });

      room1Timeline
        // Image slides up from bottom (left side)
        // Only animating transform (y) for GPU acceleration
        .fromTo(
          '.room-1-image',
          { y: '100%' },
          { y: '0%', ease: 'power2.out', force3D: true }
        )
        // Card slides up from bottom (right side) - simultaneous with image
        // Only animating transform (y) for GPU acceleration
        .fromTo(
          '.room-1-card',
          { y: '100%' },
          { y: '0%', ease: 'power2.out', force3D: true },
          '<' // Start at the same time as previous animation
        )
        // Stagger animate features list items
        // Only animating opacity and transform (x) for GPU acceleration
        .fromTo(
          '.room-1-card .features li',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out', force3D: true },
          '-=0.3' // Start slightly before previous animation ends
        );

      // ===== PHASE 2: ROOM 1 → ROOM 2 TRANSITION (33-66%) =====
      // Layout flips: [Image Left, Card Right] → [Card Left, Image Right]
      const room2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // Fixed: Use direct ref instead of class selector
          start: 'top+=100vh top',
          end: '+=100vh',
          scrub: 1,
        },
      });

      room2Timeline
        // Room 1 image exits downward
        // Only animating transform (y) for GPU acceleration
        .to('.room-1-image', {
          y: '100%',
          ease: 'power2.in',
          force3D: true,
        })
        // Room 1 card exits downward (instead of sliding left)
        // Only animating transform (y) for GPU acceleration
        .to(
          '.room-1-card',
          {
            y: '100%',
            ease: 'power2.in',
            force3D: true,
          },
          '<' // Start at the same time as image exit
        )
        // Room 2 card enters from right (starts at translateX(50vw), animates to 0)
        // Only animating transform (x) for GPU acceleration
        .to(
          '.room-2-card',
          {
            x: '0',
            ease: 'power2.out',
            force3D: true,
          },
          '<0.4' // Start 40% into the exit animations
        )
        // Fade in Room 2 card content
        // Only animating opacity and transform (scale) for GPU acceleration
        .to(
          '.room-2-card .card-content',
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            force3D: true,
          },
          '<0.2' // Start slightly after card starts moving
        )
        // Room 2 image enters from bottom-right
        // Only animating transform (x, y) for GPU acceleration
        .fromTo(
          '.room-2-image',
          { y: '100%', x: '50vw' },
          { y: '0%', x: '0', ease: 'power2.out', force3D: true },
          '<-0.1' // Start slightly before card content fades in
        )
        // Stagger animate Room 2 features list
        // Only animating opacity and transform (x) for GPU acceleration
        .to(
          '.room-2-card .features li',
          { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out', force3D: true },
          '-=0.4'
        );

      // ===== PHASE 3: ROOM 2 → ROOM 3 TRANSITION (66-100%) =====
      // Layout flips back: [Card Left, Image Right] → [Image Left, Card Right]
      const room3Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // Fixed: Use direct ref instead of class selector
          start: 'top+=200vh top',
          end: '+=100vh',
          scrub: 1,
        },
      });

      room3Timeline
        // Room 2 card exits downward
        // Only animating transform (y) for GPU acceleration
        .to('.room-2-card', {
          y: '100%',
          ease: 'power2.in',
          force3D: true,
        })
        // Room 2 image exits downward
        // Only animating transform (y) for GPU acceleration
        .to(
          '.room-2-image',
          {
            y: '100%',
            ease: 'power2.in',
            force3D: true,
          },
          '<' // Start at the same time as card exit
        )
        // Room 3 image enters from right (starts at translateX(50vw), animates to 0)
        // Only animating transform (x) for GPU acceleration
        .to(
          '.room-3-image',
          {
            x: '0',
            ease: 'power2.out',
            force3D: true,
          },
          '<0.4' // Start 40% into the exit animations
        )
        // Fade in Room 3 image content
        // Only animating opacity and transform (scale) for GPU acceleration
        .to(
          '.room-3-image .image-content',
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            force3D: true,
          },
          '<0.2' // Start slightly after image starts moving
        )
        // Room 3 card enters from bottom-right
        // Only animating transform (x, y) for GPU acceleration
        .fromTo(
          '.room-3-card',
          { y: '100%', x: '50vw' },
          { y: '0%', x: '0', ease: 'power2.out', force3D: true },
          '<-0.1' // Start slightly before image content fades in
        )
        // Stagger animate Room 3 features list
        // Only animating opacity and transform (x) for GPU acceleration
        .to(
          '.room-3-card .features li',
          { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out', force3D: true },
          '-=0.4'
        );
    }, sectionRef);

    // Handle window resize to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Listen for changes to reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // User enabled reduced motion - kill all animations
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === sectionRef.current) {
            trigger.kill();
          }
        });
        
        // Reset all transforms
        gsap.set('.room-card, .room-image', {
          clearProps: 'all',
        });
        
        gsap.set('.room-card .card-content, .room-image .image-content', {
          opacity: 1,
          scale: 1,
        });
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Reduced motion enabled: GSAP pinning disabled');
        }
      } else {
        // User disabled reduced motion - refresh to re-enable animations
        ScrollTrigger.refresh();
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Reduced motion disabled: GSAP pinning re-enabled');
        }
      }
    };

    // Add listener for reduced motion changes (modern browsers)
    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    } else {
      // Fallback for older browsers
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }

    // Cleanup function to revert GSAP context on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Remove reduced motion listener
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      } else {
        // Fallback for older browsers
        reducedMotionQuery.removeListener(handleReducedMotionChange);
      }
      
      // Kill all ScrollTrigger instances for this section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
      
      ctx.revert();
    };
  }, []);

  return sectionRef;
}
