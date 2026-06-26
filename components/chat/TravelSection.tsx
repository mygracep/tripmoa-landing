'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import type { Section, Place } from './types';

const DAY_PATTERN = /^(day\s*\d+|\d+일차)/i;

interface Props {
  section: Section;
  places: Place[];
  onRefClick: (id: number) => void;
  index?: number;
}

export default function TravelSection({ section, places, onRefClick, index = 0 }: Props) {
  const isDaySection = DAY_PATTERN.test(section.title.trim());
  const hasTable = !!(
    section.table &&
    Array.isArray(section.table.headers) &&
    Array.isArray(section.table.rows) &&
    section.table.rows.length > 0
  );

  const dayPhoto = (() => {
    if (!isDaySection) return null;
    const m = section.title.trim().match(/(\d+)/);
    if (!m) return null;
    const dayNum = Number(m[1]);
    const hit = places.find((p) => p.day === dayNum && p.photo_url);
    return hit?.photo_url ?? null;
  })();

  const findPlacePhoto = (name: string): string | null => {
    const clean = name.trim();
    if (!clean) return null;
    const hit = places.find(
      (p) => p.photo_url && (p.name.includes(clean) || clean.includes(p.name))
    );
    return hit?.photo_url ?? null;
  };

  const staggerStyle = { '--section-i': index } as React.CSSProperties;

  // ── Recommendation cards (table section) ──
  if (hasTable) {
    return (
      <div className={styles.sectionTableBlock} style={staggerStyle}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>{section.icon}</span>
          {section.title}
        </h3>
        <div className={styles.recCardList}>
          {section.table!.rows.map((row, ri) => {
            const [label, ...descCells] = row;
            const photo = findPlacePhoto(label);
            return (
              <div key={ri} className={`${styles.recCard} ${!photo ? styles.recCardNoImg : ''}`}>
                {photo && (
                  <div className={styles.recCardImgWrap}>
                    <img className={styles.recCardImg} src={photo} alt={label} loading="lazy" />
                  </div>
                )}
                <div className={styles.recCardBody}>
                  <span className={styles.recCardName}>{label}</span>
                  {descCells.map((cell, ci) => (
                    <p key={ci} className={styles.recCardDesc}>
                      <RenderContent content={cell} onRefClick={onRefClick} />
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {section.content && (
          <p className={styles.sectionConclusion}>
            <RenderContent content={section.content} onRefClick={onRefClick} />
          </p>
        )}
      </div>
    );
  }

  // ── Day section ──
  if (isDaySection) {
    return (
      <div className={styles.sectionDayBlock} style={staggerStyle}>
        <div className={styles.sectionDayHeader}>
          <div className={styles.sectionDayMeta}>
            <span className={styles.sectionDayPill}>{section.icon}</span>
          </div>
          <h3 className={styles.sectionDayTitle}>{section.title}</h3>
        </div>
        {dayPhoto && (
          <img
            className={styles.sectionDayPhoto}
            src={dayPhoto}
            alt={section.title}
            loading="lazy"
          />
        )}
        <p className={styles.sectionContent}>
          <RenderContent content={section.content} onRefClick={onRefClick} />
        </p>
      </div>
    );
  }

  // ── Plain section ──
  return (
    <div className={styles.sectionPlainBlock} style={staggerStyle}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>{section.icon}</span>
        {section.title}
      </h3>
      <p className={styles.sectionContent}>
        <RenderContent content={section.content} onRefClick={onRefClick} />
      </p>
    </div>
  );
}
