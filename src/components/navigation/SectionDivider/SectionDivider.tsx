import { Icon } from '../../../foundations';
import Pagination, { type PaginationStatus } from '../Pagination';
import styles from './SectionDivider.module.css';

export type SectionDividerType =
  | 'base'
  | 'cta'
  | 'carousel-pagination'
  | 'single-icon'
  | 'info'
  | 'info-cta'
  | 'double-icon';

export type SectionDividerProps = {
  className?: string;
  label: string;
  type?: SectionDividerType;
  /** Yalnız web; true iken yatay padding sıfırlanır. */
  fullWidth?: boolean;
  ctaLabel?: string;
  onCtaClick?: () => void;
  onIconClick?: () => void;
  paginationStatus?: PaginationStatus;
  tone?: 'default' | 'inverse';
};

export default function SectionDivider({
  className,
  label,
  type = 'base',
  fullWidth = false,
  ctaLabel,
  onCtaClick,
  onIconClick,
  paginationStatus = 'first',
  tone = 'default',
}: SectionDividerProps) {
  const showCta = type === 'cta' || type === 'info-cta';
  const showInfo = type === 'info' || type === 'info-cta';
  const showPagination = type === 'carousel-pagination';
  const showSingle = type === 'single-icon';
  const showDouble = type === 'double-icon';

  return (
    <div
      className={[styles.root, fullWidth && styles.fullWidth, className].filter(Boolean).join(' ')}
    >
      <div className={[styles.labelGroup, tone === 'inverse' && styles.inverse].filter(Boolean).join(' ')}>
        <span className={styles.label}>{label}</span>
        {showInfo && <Icon set="Security" name="Info" size={24} className={styles.infoIcon} />}
      </div>

      {showCta && (
        <button type="button" className={styles.cta} onClick={onCtaClick}>
          {ctaLabel ?? label}
        </button>
      )}

      {showPagination && <Pagination status={paginationStatus} className={styles.pagination} />}

      {showSingle && (
        <button type="button" className={styles.iconButton} aria-label={label} onClick={onIconClick}>
          <Icon set="Arrows / Double" name="Out Simple" size={24} />
        </button>
      )}

      {showDouble && (
        <div className={styles.iconGroup}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={`${label} — ortala`}
            onClick={onIconClick}
          >
            <Icon set="Design" name="Align - Center Vertical" size={24} />
          </button>
          <button type="button" className={styles.iconButton} aria-label={label} onClick={onIconClick}>
            <Icon set="Arrows / Double" name="Out Simple" size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
