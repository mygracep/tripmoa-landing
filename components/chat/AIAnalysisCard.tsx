'use client';

import styles from './chat.module.css';

interface Props {
  reviewCount: number;
  placeCount: number;
  genTime: number;
}

export default function AIAnalysisCard({ reviewCount, placeCount, genTime }: Props) {
  const confidence = Math.min(98, 72 + Math.floor(reviewCount * 0.18));

  return (
    <div className={styles.analysisCard}>
      <span className={styles.analysisBrain}>🧠</span>
      <span className={styles.analysisText}>
        리뷰 <span className={styles.analysisHighlight}>{reviewCount}개</span>
        <span className={styles.analysisDot}>·</span>
        장소 <span className={styles.analysisHighlight}>{placeCount}곳</span>
        <span className={styles.analysisDot}>·</span>
        신뢰도 <span className={styles.analysisHighlight}>{confidence}%</span>
        <span className={styles.analysisDot}>·</span>
        {genTime.toFixed(1)}s
      </span>
    </div>
  );
}
