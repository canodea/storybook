import { Icon } from '../../../foundations';
import { WarningSigns } from '../../illustrations/WarningSigns';
import { Otps } from '../../illustrations/Otps';
import { Campaign } from '../../illustrations/Campaign';
import styles from './InAppNotifications.module.css';

export type InAppNotificationsStatus = 'offer' | 'reminder' | 'warning';

export type InAppNotificationsProps = {
  className?: string;
  status?: InAppNotificationsStatus;
  title?: string;
  description?: string;
  textLink?: string;
  onTextLinkClick?: () => void;
  onClose?: () => void;
  /** Durum etiketi; verilmezse status'tan türetilir (Offer/Reminder/Warning). */
  statusLabel?: string;
};

const STATUS_LABEL: Record<InAppNotificationsStatus, string> = {
  offer: 'Offer',
  reminder: 'Reminder',
  warning: 'Warning',
};

export default function InAppNotifications({
  className,
  status = 'offer',
  title = 'Lorem ipsum dolor sit amet.',
  description = 'Lorem ipsum dolor sit amet consectetur. Parturient diam aliquam cursus egestas.',
  textLink = 'TEXT LINK',
  onTextLinkClick,
  onClose,
  statusLabel,
}: InAppNotificationsProps) {
  const label = statusLabel ?? STATUS_LABEL[status];

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-status={status}
    >
      <span
        className={[styles.illustration, status === 'warning' && styles.illustrationWarning]
          .filter(Boolean)
          .join(' ')}
      >
        {status === 'warning' && <WarningSigns type="warning" size={32} />}
        {status === 'reminder' && <Otps channel="push-ntf" size={56} />}
        {status === 'offer' && <Campaign size={56} />}
      </span>

      <div className={styles.content}>
        <div className={styles.statusRow}>
          <span className={styles.dot} />
          <span className={styles.statusLabel}>{label}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {textLink && (
          <button type="button" className={styles.textLink} onClick={onTextLinkClick}>
            {textLink}
          </button>
        )}
      </div>

      <button type="button" className={styles.close} aria-label="Kapat" onClick={onClose}>
        <Icon set="Math" name="X" size={24} />
      </button>
    </div>
  );
}
