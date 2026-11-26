import type { ReactNode } from 'react';
import styles from './DocHero.module.css';

export type DocHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
};

/** Wix-style page hero: light grey band, large display title. */
export function DocHero({ eyebrow, title, lead }: DocHeroProps) {
  return (
    <header className={styles.hero}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
