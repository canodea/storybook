import { Icon } from '../../foundations';
import styles from './Tooltip.module.css';

export type TooltipPlacement =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export type TooltipProps = {
  className?: string;
  title?: string;
  description?: string;
  /** Figma: Show Title. */
  showTitle?: boolean;
  /** Figma: Show Close. */
  showClose?: boolean;
  onClose?: () => void;
  /** Okun yeri (Figma: Triangle). */
  placement?: TooltipPlacement;
  /** aria-describedby için. */
  id?: string;
};

export default function Tooltip({
  className,
  title = 'Title',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  showTitle = true,
  showClose = true,
  onClose,
  placement = 'top-left',
  id,
}: TooltipProps) {
  const close = showClose ? (
    <button
      type="button"
      className={styles.close}
      aria-label="Kapat"
      onClick={onClose}
    >
      <Icon set="Math" name="X" size={20} />
    </button>
  ) : null;

  return (
    <div
      id={id}
      role="tooltip"
      data-placement={placement}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      <span className={styles.arrow} aria-hidden="true" />
      <div className={styles.bubble}>
        {showTitle ? (
          <div className={styles.header}>
            <p className={styles.title}>{title}</p>
            {close}
          </div>
        ) : null}
        <div className={styles.header}>
          <p
            className={[
              styles.description,
              showTitle && showClose && styles.descriptionWithClose,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {description}
          </p>
          {showTitle ? null : close}
        </div>
      </div>
    </div>
  );
}
