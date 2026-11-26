import type { ReactNode } from 'react';
import styles from './DocTip.module.css';

export type DocTipProps = {
  children: ReactNode;
};

/** Yellow "İPUCU" banner. */
export function DocTip({ children }: DocTipProps) {
  return (
    <aside className={styles.tip}>
      <span className={styles.badge}>İPUCU</span>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
