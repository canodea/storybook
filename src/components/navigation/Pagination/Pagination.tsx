import styles from './Pagination.module.css';

export type PaginationStatus = 'first' | 'second' | 'third';

export type PaginationProps = {
  className?: string;
  status: PaginationStatus;
  dotNumber?: boolean;
};

export default function Pagination({ className, status, dotNumber = false }: PaginationProps) {
  const activeIndex = status === 'first' ? 0 : status === 'second' ? 1 : 2;

  if (dotNumber) {
    // Dot Number: yalnız iki öğe, sağa yaslı. third Figma'da yok, first'e düşürülür.
    const index = activeIndex === 1 ? 1 : 0;
    return (
      <div className={[styles.root, styles.dotNumber, className].filter(Boolean).join(' ')}>
        {[0, 1].map((i) => (
          <span key={i} className={i === index ? styles.pill : styles.dot} />
        ))}
      </div>
    );
  }

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i === activeIndex ? styles.pill : styles.dot} />
      ))}
    </div>
  );
}
