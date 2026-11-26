import type { ReactNode } from 'react';
import { resolveDocHref } from './DocLink';
import styles from './DocCardGrid.module.css';

export type DocCardItem = {
  title: string;
  description: string;
  href: string;
  preview: ReactNode;
};

export type DocCardGridProps = {
  items: DocCardItem[];
};

/** Three-column link cards with an illustrative preview above each title. */
export function DocCardGrid({ items }: DocCardGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <a
          key={item.title}
          className={styles.card}
          href={resolveDocHref(item.href)}
          {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <span className={styles.preview} aria-hidden="true">
            {item.preview}
          </span>
          <span className={styles.content}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.description}>{item.description}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
