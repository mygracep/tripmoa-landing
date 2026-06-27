'use client';

import styles from './chat.module.css';

export default function TypingAnimation() {
  return (
    <div className={styles.typingWrap}>
      <div className={styles.typingDots}>
        <span className={styles.tDot} />
        <span className={styles.tDot} />
        <span className={styles.tDot} />
      </div>
      <span className={styles.typingLabel}>AI가 여행 정보를 분석하고 있어요…</span>
    </div>
  );
}
