import { Icon, type IconSet } from '../../foundations';
import illustrationPlace from './assets/imgIllustrationPlace.svg';
import styles from './ProductCard.module.css';

export type ProductCardProps = {
  className?: string;
  title?: string;
  subtitleText?: string;
  /** Figma: Show Chevron. */
  showChevron?: boolean;
  /** Figma: Chevron Icon (instance swap). */
  chevronIcon?: { set: IconSet; name: string };
};

export default function ProductCard({
  className,
  title = 'Title',
  subtitleText = 'Sub text goes here',
  showChevron = true,
  chevronIcon = { set: 'Arrows / Caret', name: 'Right' },
}: ProductCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.left}>
        {/* Görsel zorunlu: Product Card görselsiz kullanılmaz. */}
        <span className={styles.illustration} aria-hidden="true">
          <img src={illustrationPlace} alt="" />
        </span>
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>{subtitleText}</p>
        </div>
      </div>
      {showChevron ? (
        <span className={styles.caret} aria-hidden="true">
          <Icon {...chevronIcon} size={16} />
        </span>
      ) : null}
    </div>
  );
}
