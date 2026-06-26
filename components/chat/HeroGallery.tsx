'use client';

import { useState, useRef } from 'react';
import styles from './chat.module.css';

interface HeroImage {
  url: string;
  alt: string;
}

interface Props {
  images: HeroImage[];
}

export default function HeroGallery({ images }: Props) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className={styles.heroSingle}>
        <img src={images[0].url} alt={images[0].alt} loading="eager" />
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy) isDragging.current = true;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 42) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <div
      className={styles.heroCarouselWrap}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={styles.heroTrack}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt}
            className={styles.heroImg}
            loading={i === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className={styles.heroGradient} />

      {/* Counter badge */}
      <span className={styles.heroCounter}>{current + 1} / {images.length}</span>

      {/* Dot indicators */}
      <div className={styles.heroDots}>
        {images.slice(0, 8).map((_, i) => (
          <button
            key={i}
            className={`${styles.heroDot} ${i === current ? styles.heroDotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`${i + 1}번째 사진`}
          />
        ))}
      </div>

      {/* Desktop nav buttons */}
      <button className={`${styles.heroNav} ${styles.heroNavPrev}`} onClick={prev} aria-label="이전 사진">‹</button>
      <button className={`${styles.heroNav} ${styles.heroNavNext}`} onClick={next} aria-label="다음 사진">›</button>
    </div>
  );
}
