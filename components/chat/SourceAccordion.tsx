'use client';

import { useState, useEffect } from 'react';
import styles from './chat.module.css';
import type { Source } from './types';

function getChannelCls(channel: string): string {
  if (channel?.includes('카페')) return styles.sourceCardCafe;
  if (channel?.includes('블로그')) return styles.sourceCardBlog;
  return '';
}

function sourceBadge(channel: string): { label: string; cls: string } {
  if (channel?.includes('카페')) return { label: '네이버 카페', cls: styles.badgeCafe };
  if (channel?.includes('블로그')) return { label: '네이버 블로그', cls: styles.badgeBlog };
  return { label: channel || '웹', cls: styles.badgeEtc };
}

interface Props {
  sources: Source[];
  onSourceClick: (url: string) => void;
}

export default function SourceAccordion({ sources, onSourceClick }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('tripmoa:openSources', handler);
    return () => window.removeEventListener('tripmoa:openSources', handler);
  }, []);

  if (sources.length === 0) return null;

  return (
    <div className={styles.sourceAccordion}>
      <button
        type="button"
        className={styles.sourceToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.sourceToggleLeft}>
          📚 참고 후기{' '}
          <span className={styles.sourceCount}>({sources.length}건)</span>
        </span>
        <span className={`${styles.sourceChevron} ${open ? styles.sourceChevronOpen : ''}`}>▼</span>
      </button>

      {/* Animated expand via CSS grid */}
      <div className={`${styles.sourceListWrap} ${open ? styles.sourceListWrapOpen : ''}`}>
        <div className={styles.sourceListInner}>
          <div className={styles.sourceList}>
            {sources.map((s) => {
              const badge = sourceBadge(s.channel);
              const channelCls = getChannelCls(s.channel);
              return (
                <div
                  key={s.id}
                  id={`source-${s.id}`}
                  className={`${styles.sourceCard} ${channelCls}`}
                >
                  <div className={styles.sourceMeta}>
                    <span className={`${styles.badge} ${badge.cls}`}>{badge.label}</span>
                    {s.date && <span className={styles.sourceDate}>{s.date}</span>}
                  </div>
                  <p className={styles.sourceTitle}>{s.title}</p>
                  <a
                    className={styles.sourceLink}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onSourceClick(s.link)}
                  >
                    원문 보기 →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
