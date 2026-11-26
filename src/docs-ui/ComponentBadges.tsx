import styles from './ComponentBadges.module.css';

const FIGMA_FILE = 'https://www.figma.com/design/uxULAGb75RBUK2RB62NUzI/Foundation';

export type ComponentBadgesProps = {
  /** Figma component set node id, tire ile ("442-19239"). */
  figmaNode: string;
  /** Bileşen durumu. */
  status?: 'Stabil' | 'Beta';
};

/** Bileşen dokümanının başlığı altındaki rozet satırı: Figma linki, durum ve tema bilgisi. */
export function ComponentBadges({ figmaNode, status = 'Stabil' }: ComponentBadgesProps) {
  return (
    <div className={styles.row}>
      <a className={`${styles.badge} ${styles.link}`} href={`${FIGMA_FILE}?node-id=${figmaNode}`} target="_blank" rel="noreferrer">
        Figma ↗
      </a>
      <span className={`${styles.badge} ${status === 'Stabil' ? styles.stable : styles.beta}`}>{status}</span>
      <span className={styles.badge}>Light &amp; Dark · token</span>
    </div>
  );
}
