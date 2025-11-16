'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GalleryImage } from '@/data/locationData';
import styles from './PhotoGallery.module.css';

export interface PhotoGalleryProps {
  images: GalleryImage[];
  columns?: number;
}

export function PhotoGallery({ images, columns = 3 }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);

  return (
    <div className={styles.galleryContainer}>
      {/* Category filters */}
      <div className={styles.filters}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.filterButton} ${filter === category ? styles.active : ''}`}
            onClick={() => setFilter(category)}
            aria-label={`Filter by ${category}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div
        className={styles.gallery}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            className={styles.galleryItem}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedImage(image)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedImage(image);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View ${image.alt}`}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.image}
              />
              {image.caption && (
                <div className={styles.caption}>{image.caption}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                ✕
              </button>
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  fill
                  sizes="90vw"
                  className={styles.lightboxImage}
                />
              </div>
              {selectedImage.caption && (
                <p className={styles.lightboxCaption}>{selectedImage.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
