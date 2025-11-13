'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BaseChapterProps, CTAButton } from '@/types/chapter';
import { useParallax } from '@/hooks/useParallax';
import { useSpecificChapterProgress } from '@/hooks/useChapterProgress';
import { CHAPTER_IMAGES, ROOM_IMAGES } from '@/data/images';
import styles from './AccommodationsChapter.module.css';

export interface RoomPreview {
  id: string;
  name: string;
  image: string;
  viewImage: string;
  tagline: string;
  price: string;
}

export interface AccommodationsChapterProps extends BaseChapterProps {
  rooms?: RoomPreview[];
  ctaButton?: CTAButton;
}

export default function AccommodationsChapter({
  id,
  className = '',
  rooms = [
    {
      id: 'luxury-tent',
      name: 'Luxury Safari Tent',
      image: CHAPTER_IMAGES.accommodations.lodgeExterior,
      viewImage: CHAPTER_IMAGES.accommodations.roomInterior,
      tagline: 'Canvas walls, endless views',
      price: 'From $450/night',
    },
    {
      id: 'family-suite',
      name: 'Family Suite',
      image: ROOM_IMAGES.familySuite,
      viewImage: CHAPTER_IMAGES.accommodations.lodgeExterior,
      tagline: 'Space for memories',
      price: 'From $650/night',
    },
    {
      id: 'presidential-villa',
      name: 'Presidential Villa',
      image: ROOM_IMAGES.deluxeSuite,
      viewImage: ROOM_IMAGES.premiumRoom,
      tagline: 'Ultimate luxury in the wild',
      price: 'From $950/night',
    },
  ],
  ctaButton = {
    text: 'View All Rooms',
    href: '/accommodations',
    variant: 'primary',
  },
}: AccommodationsChapterProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  
  // Track chapter progress
  const chapterRef = useRef<HTMLElement>(null);
  const { progress } = useSpecificChapterProgress('accommodations');

  return (
    <section
      id={id}
      ref={chapterRef}
      className={`${styles.accommodationsChapter} ${className}`}
      data-chapter="accommodations"
      aria-labelledby="accommodations-heading"
    >
      {/* Background with midday lighting */}
      <div className={styles.backgroundContainer}>
        <div className={styles.gradientOverlay} />
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.headerSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 id="accommodations-heading" className={styles.heading}>
            Your Home in the Wild
          </h2>
          <p className={styles.subtitle}>
            Where comfort meets adventure
          </p>
        </motion.div>

        {/* Room Preview Cards */}
        <div className={styles.roomsContainer}>
          {rooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              isHovered={hoveredRoom === room.id}
              onHover={() => setHoveredRoom(room.id)}
              onLeave={() => setHoveredRoom(null)}
            />
          ))}
        </div>

        {/* Sticky CTA at bottom */}
        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href={ctaButton.href}
            className={`${styles.cta} ${styles[`cta${ctaButton.variant.charAt(0).toUpperCase() + ctaButton.variant.slice(1)}`]}`}
            onClick={ctaButton.onClick}
            aria-label={ctaButton.text}
          >
            {ctaButton.text}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface RoomCardProps {
  room: RoomPreview;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function RoomCard({ room, index, isHovered, onHover, onLeave }: RoomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = useParallax(cardRef, { speed: 0.4, direction: 'down' });

  // Alternating slide-in direction
  const slideDirection = index % 2 === 0 ? -60 : 60;

  return (
    <motion.div
      ref={cardRef}
      className={styles.roomCard}
      initial={{ opacity: 0, x: slideDirection }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.roomImageContainer}>
        {/* Main room image with parallax */}
        <div
          className={styles.roomImageWrapper}
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className={styles.roomImage}
            loading="lazy"
          />
        </div>

        {/* View from window overlay - appears on hover */}
        <div className={`${styles.viewOverlay} ${isHovered ? styles.viewOverlayVisible : ''}`}>
          <Image
            src={room.viewImage}
            alt={`View from ${room.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className={styles.viewImage}
            loading="lazy"
          />
          <div className={styles.viewLabel}>View from your window</div>
        </div>

        {/* Availability indicator */}
        <div className={styles.availabilityBadge}>
          <span className={styles.availabilityDot} />
          Available
        </div>
      </div>

      <div className={styles.roomInfo}>
        <h3 className={styles.roomName}>{room.name}</h3>
        <p className={styles.roomTagline}>{room.tagline}</p>
        <p className={styles.roomPrice}>{room.price}</p>
      </div>
    </motion.div>
  );
}
