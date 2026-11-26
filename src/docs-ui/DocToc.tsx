import styles from './DocToc.module.css';

export type DocTocItem = {
  id: string;
  label: string;
};

export type DocTocProps = {
  items: DocTocItem[];
  heading?: string;
};

/** Sticky on-page table of contents. Hidden on narrow screens. */
export function DocToc({ items, heading = 'İÇERİK' }: DocTocProps) {
  return (
    <nav className={styles.toc} aria-label={heading}>
      <p className={styles.heading}>{heading}</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a className={styles.link} href={`#${item.id}`} target="_self">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
