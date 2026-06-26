'use client';

import styles from './chat.module.css';

export default function LoadingMessage() {
  return (
    <div className={styles.assistantRow}>
      <div className={styles.avatar}>✈</div>
      <div className={styles.loadingWrap}>
        <div className={styles.loadingTop}>
          <div className={styles.typingDots}>
            <span className={styles.tDot} />
            <span className={styles.tDot} />
            <span className={styles.tDot} />
          </div>
          <span className={styles.loadingLabel}>실제 후기 분석 중…</span>
        </div>
        <span className={styles.loadingHint}>
          네이버 카페·블로그 리뷰를 읽고 있어요
        </span>
      </div>
    </div>
  );
}
