import { Icon } from '../../foundations';
import IconAvatar from '../avatars/IconAvatar/IconAvatar';
import styles from './InAppNotification.module.css';

export type InAppNotificationProps = {
  className?: string;
  title?: string;
  body?: string;
  /** Figma: Text Link metni. */
  actionLabel?: string;
  showAvatar?: boolean;
  showClose?: boolean;
  showTextLink?: boolean;
  onClose?: () => void;
  onAction?: () => void;
};

export function InAppNotification({
  className,
  title = 'Alert',
  body = 'Lorem ipsum sit dolorem amet quare id faciam fortasse requiris',
  actionLabel = 'TEXT LINK',
  showAvatar = true,
  showClose = true,
  showTextLink = true,
  onClose,
  onAction,
}: InAppNotificationProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      {showAvatar ? (
        <span className={styles.avatar} aria-hidden="true">
          <IconAvatar size="medium" icon={{ set: 'System', name: 'BellSimpleRinging' }} />
        </span>
      ) : null}
      <div className={styles.data}>
        <div className={styles.textGroup}>
          <p className={styles.title}>{title}</p>
          <p className={styles.body}>{body}</p>
        </div>
        {showTextLink ? (
          <button type="button" className={styles.action} onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
      {showClose ? (
        <button type="button" className={styles.iconButton} aria-label="Kapat" onClick={onClose}>
          <Icon set="System" name="XCircle" size={24} />
        </button>
      ) : null}
    </div>
  );
}

export default InAppNotification;
