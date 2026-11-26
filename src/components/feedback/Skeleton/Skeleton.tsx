import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonShape = 'line' | 'circle' | 'block' | 'list-item' | 'card';

export type SkeletonProps = {
  className?: string;
  shape?: SkeletonShape;
  /** Genişlik; yalnız line/circle/block için geçerlidir. */
  width?: CSSProperties['width'];
  /** Yükseklik; yalnız line/circle/block için geçerlidir. */
  height?: CSSProperties['height'];
  /** list-item tekrar sayısı; diğer şekillerde yok sayılır. */
  count?: number;
};

export default function Skeleton({
  className,
  shape = 'line',
  width,
  height,
  count = 1,
}: SkeletonProps) {
  if (shape === 'card') {
    return (
      <div className={[styles.card, className].filter(Boolean).join(' ')} aria-hidden="true">
        <span className={styles.part} data-shape="line" style={{ width: 120 }} />
        <span className={styles.part} data-shape="line" style={{ width: 200 }} />
        <span className={styles.part} data-shape="block" style={{ width: 295, height: 48 }} />
      </div>
    );
  }

  if (shape === 'list-item') {
    return (
      <div className={[styles.list, className].filter(Boolean).join(' ')} aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={styles.listItem}>
            <span className={styles.part} data-shape="circle" />
            <div className={styles.listBody}>
              <span className={styles.part} data-shape="line" style={{ width: 160 }} />
              <span className={styles.part} data-shape="line" style={{ width: 96 }} />
            </div>
            <span className={styles.part} data-shape="line" style={{ width: 64 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <span
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-shape={shape}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
