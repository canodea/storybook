import { Icon, type IconSet } from '../../foundations';
import styles from './ActivityItem.module.css';

export type ActivityItemIcon = { set: IconSet; name: string };
export type ActivityItemMetaItem = string | { icon?: ActivityItemIcon; text: string };

export type ActivityItemProps = {
  className?: string;
  date: { day: string; month: string; year: string };
  title: string;
  description?: string;
  meta?: ActivityItemMetaItem[];
  amount: string;
  /**
   * Gelen (incoming) işlemde tutar yeşil (`status/success`), giden (outgoing) işlemde birincil metin rengindedir.
   * Verilmezse tutarın işaretinden okunur: "+" gelen, diğerleri giden.
   */
  direction?: 'incoming' | 'outgoing';
  status?: string;
  action?: { label: string; icon?: ActivityItemIcon; onClick?: () => void };
  iconActions?: Array<{ icon: ActivityItemIcon; label: string; onClick?: () => void }>;
};

export default function ActivityItem({
  className,
  date,
  title,
  description,
  meta = [],
  amount,
  direction,
  status,
  action,
  iconActions = [],
}: ActivityItemProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.left}>
        <div className={styles.dateColumn}>
          <div className={styles.dateCard}>
            <span className={styles.dateDay}>{date.day}</span>
            <span className={styles.dateMonth}>{date.month}</span>
            <span className={styles.dateYear}>{date.year}</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.heading}>
            <p className={styles.title}>{title}</p>
            {description && <p className={styles.description}>{description}</p>}
          </div>

          {meta.length > 0 && (
            <div className={styles.metaRow}>
              {meta.map((item, index) => {
                const { icon, text } = typeof item === 'string' ? { icon: undefined, text: item } : item;
                return (
                  <span className={styles.metaItem} key={index}>
                    {icon && <Icon {...icon} size={16} className={styles.metaIcon} />}
                    <p className={styles.metaText}>{text}</p>
                  </span>
                );
              })}
            </div>
          )}

          {action && (
            <button type="button" className={styles.action} onClick={action.onClick}>
              {action.icon && <Icon {...action.icon} size={16} className={styles.actionIcon} />}
              <span className={styles.actionLabel}>{action.label}</span>
            </button>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.amountBlock}>
          <p
            className={[
              styles.amount,
              (direction ?? (amount.trim().startsWith('+') ? 'incoming' : 'outgoing')) === 'incoming' &&
                styles.amountIncoming,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {amount}
          </p>
          {status && <p className={styles.status}>{status}</p>}
        </div>

        {iconActions.length > 0 && (
          <div className={styles.iconActions}>
            {iconActions.map(({ icon, label, onClick }, index) => (
              <button key={index} type="button" className={styles.iconButton} aria-label={label} onClick={onClick}>
                <Icon {...icon} size={24} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
