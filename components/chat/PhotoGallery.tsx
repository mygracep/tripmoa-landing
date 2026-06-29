'use client';

import styles from './chat.module.css';

interface Props {
  urls: string[];
  alt: string;
}

export default function PhotoGallery({ urls, alt }: Props) {
  const items = urls.slice(0, 4);

  if (items.length === 0) return null;

  return (
    <div className={styles.photoGalleryWrap}>
      <div
        className={styles.photoGalleryStrip}
        role="list"
        aria-label={`${alt} 사진`}
      >
        {items.map((url, i) => (
          <div key={i} className={styles.photoGallerySlide} role="listitem" data-photo-slide>
            <img
              className={styles.photoGallerySlideImg}
              src={url}
              alt={`${alt} ${i + 1}`}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}