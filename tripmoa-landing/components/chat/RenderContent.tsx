'use client';

import styles from './chat.module.css';

interface Props {
  content: string | null | undefined;
  onRefClick: (id: number) => void;
}

export default function RenderContent({ content, onRefClick }: Props) {
  if (!content) return null;

  // Collapse whitespace between consecutive ref markers
  const normalized = content.replace(/(\[ref:\d+\])\s+(?=\[ref:\d+\])/g, '$1');
  const parts = normalized.split(/(\*\*[^*]+\*\*|\[ref:\d+\])/).filter((p) => p !== '');

  let refGroupOpen = false;
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    const refMatch = part.match(/^\[ref:(\d+)\]$/);

    if (boldMatch) {
      if (refGroupOpen) { nodes.push(<span key={`gc-${i}`} className={styles.refGroupEnd} />); refGroupOpen = false; }
      nodes.push(<strong key={i}>{boldMatch[1]}</strong>);
      return;
    }

    if (refMatch) {
      const id = Number(refMatch[1]);
      if (!refGroupOpen) { nodes.push(<span key={`go-${i}`} className={styles.refGroupStart} />); refGroupOpen = true; }
      nodes.push(
        <button
          key={i}
          type="button"
          className={styles.refBadge}
          onClick={() => onRefClick(id)}
          aria-label={`출처 ${id}번 보기`}
        >
          {id}
        </button>
      );
      return;
    }

    if (refGroupOpen) { nodes.push(<span key={`gc-${i}`} className={styles.refGroupEnd} />); refGroupOpen = false; }
    nodes.push(<span key={i}>{part}</span>);
  });

  return <>{nodes}</>;
}
