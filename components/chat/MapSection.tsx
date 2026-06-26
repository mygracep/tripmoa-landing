'use client';

import styles from './chat.module.css';
import MapLoader from '@/components/MapLoader';
import type { Place } from './types';

interface Props {
  places: Place[];
  visiblePlaces: Place[];
  dayList: number[];
  activeDay: number | null;
  onDayChange: (day: number) => void;
  query: string;
}

export default function MapSection({
  places,
  visiblePlaces,
  dayList,
  activeDay,
  onDayChange,
  query,
}: Props) {
  if (places.length === 0) return null;

  return (
    <div className={styles.mapSection}>
      <div className={styles.mapLabel}>
        <span className={styles.mapPin}>📍</span>
        <span>
          <strong>{query}</strong> 여행 일정 장소
        </span>
      </div>

      <div className={styles.mapStage}>
        <div className={styles.mapStageInner}>
          {dayList.length > 0 && (
            <div className={styles.dayTabs}>
              {dayList.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`${styles.dayTab} ${activeDay === d ? styles.dayTabActive : ''}`}
                  onClick={() => onDayChange(d)}
                >
                  {d}일차
                </button>
              ))}
            </div>
          )}
          <div className={styles.mapContainer}>
            <MapLoader
              locations={places.map((p) => ({
                name: p.name,
                lat: p.lat,
                lng: p.lng,
                image: p.photo_url,
                day: p.day,
              }))}
              activeDay={dayList.length > 0 ? activeDay : null}
            />
          </div>
        </div>

        {visiblePlaces.some((p) => p.photo_url) && (
          <div className={styles.placeStrip}>
            {visiblePlaces.map((p, i) => (
              <div key={i} className={styles.placeStripCard}>
                {p.photo_url && (
                  <img
                    className={styles.placeStripImg}
                    src={p.photo_url}
                    alt={p.name}
                    loading="lazy"
                  />
                )}
                <div className={styles.placeStripInfo}>
                  <span className={styles.placeStripName}>{p.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
