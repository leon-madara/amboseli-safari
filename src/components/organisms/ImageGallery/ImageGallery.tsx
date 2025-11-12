'use client';

import { useState } from 'react';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img src={images[selectedIndex]} alt={`Gallery image ${selectedIndex + 1}`} />
      </div>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${index === selectedIndex ? styles.active : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
