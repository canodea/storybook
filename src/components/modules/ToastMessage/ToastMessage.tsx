import StatusTag from '../../feedback/StatusTag';
import styles from './ToastMessage.module.css';

export type ToastMessageProps = {
  className?: string;
  message?: string;
  /** true ise önde success StatusTag gösterilir. */
  icon?: boolean;
  /** Görünüm süresi (ms); host'un zamanlama mantığı için ayrılmıştır, story'de kullanılmaz. */
  duration?: number;
  /** Süre dolunca host tarafından çağrılır. */
  onClose?: () => void;
};

export default function ToastMessage({
  className,
  message = 'Text goes here',
  icon = true,
}: ToastMessageProps) {
  return (
    <div
      className={[styles.root, !icon && styles.noIcon, className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <span className={styles.icon}>
          <StatusTag status="success" />
        </span>
      )}
      <span className={styles.message}>{message}</span>
    </div>
  );
}
