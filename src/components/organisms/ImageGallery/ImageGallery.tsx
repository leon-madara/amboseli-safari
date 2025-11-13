'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image 
          src={images[selectedIndex]} 
          alt={`Gallery image ${selectedIndex + 1}`}
          width={800}
          height={600}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
          priority
        />
      </div>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${index === selectedIndex ? styles.active : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            <Image 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={75}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
