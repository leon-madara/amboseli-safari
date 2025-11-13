'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ParallaxImage } from '@/components/atoms/ParallaxImage';
import AtmosphericParticles from '@/components/atoms/AtmosphericParticles/AtmosphericParticles';
import TestimonialCarousel from '@/components/molecules/TestimonialCarousel';
import { CHAPTER_IMAGES } from '@/data/images';
import { GUEST_TESTIMONIALS } from '@/data/guestTestimonials';
import { GUEST_PHOTOS_DATA, VIDEO_TESTIMONIALS } from '@/data/guestPhotos';
import styles from './GuestStoriesChapter.module.css';

interface GuestStoriesChapterProps {
  id: string;
}

/**
 * Chapter 9: Guest Stories
 *
 * Showcases social proof through testimonials, guest photos, and video stories.
 * Features:
 * - Auto-advancing testimonial carousel
 * - Instagram-style video story circles
 * - Masonry photo wall with hover effects
 * - Dusk atmosphere with firefly particles
 *
 * Requirements: 11.1-11.5
 */
export default function GuestStoriesChapter({ id }: GuestStoriesChapterProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      id={id}
      className={styles.guestStoriesChapter}
      data-chapter="guest-stories"
      data-time-of-day="dusk"
    >
      {/* Background layer with parallax */}
      <ParallaxImage
        src={CHAPTER_IMAGES.guestStories.campfire}
        alt="Campfire at dusk in the savannah"
        speed={0.3}
        className={styles.backgroundImage}
        priority={false}
      />

      {/* Atmospheric overlay for dusk effect */}
      <div className={styles.atmosphericOverlay} />

      {/* Firefly particles (only when in view) */}
      {inView && (
        <AtmosphericParticles
          type="fireflies"
          density={20}
          speed={2}
        />
      )}

      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Section header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stories from the Savannah
          </motion.h2>
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hear from guests who've experienced the magic of Amboseli
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div className={styles.testimonialSection}>
          <TestimonialCarousel
            testimonials={GUEST_TESTIMONIALS}
            autoAdvanceDelay={5000}
            className={styles.carousel}
          />
        </div>

        {/* Video Story Circles */}
        <div className={styles.videoStoriesSection}>
          <h3 className={styles.sectionHeading}>Guest Video Stories</h3>
          <div className={styles.storyCirclesContainer}>
            {VIDEO_TESTIMONIALS.map((video, index) => (
              <VideoStoryCircle
                key={video.id}
                video={video}
                delay={index * 0.1}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* Guest Photo Wall */}
        <div className={styles.photoWallSection}>
          <h3 className={styles.sectionHeading}>Captured Moments</h3>
          <GuestPhotoWall
            photos={GUEST_PHOTOS_DATA}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Video Story Circle Component
 * Instagram-style story circle with pulsing animation
 */
interface VideoStoryCircleProps {
  video: typeof VIDEO_TESTIMONIALS[0];
  delay: number;
  inView: boolean;
}

function VideoStoryCircle({ video, delay, inView }: VideoStoryCircleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className={styles.storyCircle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, delay }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
        style={{
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <div className={styles.storyCircleRing} />
        <div className={styles.storyCircleImage}>
          <Image
            src={video.thumbnail}
            alt={`${video.guestName} video testimonial`}
            fill
            sizes="120px"
            className={styles.thumbnailImage}
          />
        </div>
        <div className={styles.playIcon}>▶</div>
        <p className={styles.storyCircleName}>{video.guestName}</p>
      </motion.div>

      {/* Video Modal */}
      {showModal && (
        <VideoModal
          video={video}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

/**
 * Guest Photo Wall Component
 * Masonry layout with staggered fade-in
 */
interface GuestPhotoWallProps {
  photos: typeof GUEST_PHOTOS_DATA;
  inView: boolean;
}

function GuestPhotoWall({ photos, inView }: GuestPhotoWallProps) {
  return (
    <div className={styles.photoWallGrid}>
      {photos.map((photo, index) => (
        <GuestPhotoCard
          key={photo.id}
          photo={photo}
          delay={index * 0.1}
          inView={inView}
        />
      ))}
    </div>
  );
}

/**
 * Individual Photo Card with hover overlay
 */
interface GuestPhotoCardProps {
  photo: typeof GUEST_PHOTOS_DATA[0];
  delay: number;
  inView: boolean;
}

function GuestPhotoCard({ photo, delay, inView }: GuestPhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.photoCard}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.photoCardImage}>
        <Image
          src={photo.image}
          alt={photo.caption}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={styles.photoImage}
        />
      </div>

      {/* Hover overlay */}
      <motion.div
        className={styles.photoOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.photoOverlayContent}>
          <p className={styles.photoCaption}>{photo.caption}</p>
          <div className={styles.photoMeta}>
            <span className={styles.photoGuest}>{photo.guestName}</span>
            <span className={styles.photoLocation}>{photo.location}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Video Modal Component
 * Full-screen modal for video playback
 */
interface VideoModalProps {
  video: typeof VIDEO_TESTIMONIALS[0];
  onClose: () => void;
}

function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.videoModal} onClick={onClose}>
      <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.videoContainer}>
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoIframe}
          />
        </div>
        <div className={styles.videoInfo}>
          <h4>{video.title}</h4>
          <p>{video.guestName} • {video.duration}</p>
        </div>
      </div>
    </div>
  );
}
