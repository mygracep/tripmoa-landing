'use client';

import styles from './chat.module.css';

interface Props {
  query: string;
  city?: string;
}

export default function UserMessage({ query, city }: Props) {
  return (
    <div className={styles.userRow}>
      <div className={styles.userBubble}>
        {city && <span className={styles.cityTag}>[{city}]</span>}
        {query}
      </div>
    </div>
  );
}
