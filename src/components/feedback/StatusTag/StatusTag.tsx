import { Icon, type IconSet } from '../../../foundations';
import styles from './StatusTag.module.css';

export type StatusTagStatus = 'success' | 'bullet' | 'alarm' | 'pending' | 'unsuccess';

export type StatusTagProps = {
  className?: string;
  status: StatusTagStatus;
};

type IconStatus = Exclude<StatusTagStatus, 'bullet'>;

const STATUS_META: Record<IconStatus, { bg: string; icon: { set: IconSet; name: string }; label: string }> = {
  success: { bg: 'var(--odea-status-success)', icon: { set: 'System', name: 'Check' }, label: 'Başarılı' },
  alarm: { bg: 'var(--odea-status-warning)', icon: { set: 'System', name: 'BellSimple' }, label: 'Dikkat' },
  pending: { bg: 'var(--odea-status-warning)', icon: { set: 'Time', name: 'Timer' }, label: 'Beklemede' },
  unsuccess: { bg: 'var(--odea-status-danger)', icon: { set: 'Math', name: 'X' }, label: 'Başarısız' },
};

export default function StatusTag({ className, status }: StatusTagProps) {
  if (status === 'bullet') {
    return (
      <div className={[styles.root, className].filter(Boolean).join(' ')} role="img" aria-label="Durum">
        <span className={styles.bullet} />
      </div>
    );
  }

  const meta = STATUS_META[status];
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} role="img" aria-label={meta.label}>
      <span className={styles.circle} style={{ background: meta.bg }}>
        <Icon {...meta.icon} size={10} className={styles.icon} />
      </span>
    </div>
  );
}
