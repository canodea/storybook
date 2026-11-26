import { Icon, type IconSet } from '../../foundations';
import WomanAnalyze from '../illustrations/WomanAnalyze/WomanAnalyze';
import styles from './MessageCard.module.css';

export type MessageCardIcon = { set: IconSet; name: string };

export type MessageCardProps = {
  className?: string;
  /** Figma: Show Media. */
  showMedia?: boolean;
  title: string;
  /** Figma: Description metni. Figma'da tek varyant (Promo + Description) vardır. */
  description?: string;
  action?: { label: string; onClick?: () => void };
  /** Figma: Show Close. Verilmezse kapatma butonu render edilmez. */
  onClose?: () => void;
  /** Figma: Close Icon (instance swap). */
  closeIcon?: MessageCardIcon;
};

/** Figma: Illustration Place (Medium) içinde Woman Analyze, 56 px. */
function Illustration() {
  return (
    <span className={styles.illustration} aria-hidden="true">
      <WomanAnalyze size={56} />
    </span>
  );
}

export function MessageCard({
  className,
  showMedia = true,
  title,
  description,
  action,
  onClose,
  closeIcon = { set: 'Math', name: 'X' },
}: MessageCardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      {showMedia ? <Illustration /> : null}
      <div className={description ? styles.data : `${styles.data} ${styles.dataPromo}`}>
        <div className={styles.textGroup}>
          <p className={styles.title}>{title}</p>
          {description ? <p className={styles.body}>{description}</p> : null}
        </div>
        {action ? (
          <button type="button" className={styles.action} onClick={action.onClick}>
            {action.label}
          </button>
        ) : null}
      </div>
      {onClose ? (
        <button type="button" className={styles.iconButton} onClick={onClose} aria-label="Kapat">
          <Icon {...closeIcon} size={24} />
        </button>
      ) : null}
    </div>
  );
}

export default MessageCard;
