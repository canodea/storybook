import { Icon, type IconSet } from '../../../foundations';
import styles from './Shortcut.module.css';

export type ShortcutIcon = { set: IconSet; name: string };

export type ShortcutProps = {
  className?: string;
  label?: string;
  icon?: ShortcutIcon;
  onClick?: () => void;
};

export default function Shortcut({
  className,
  label = 'More',
  icon = { set: 'Design', name: 'Squares Four' },
  onClick,
}: ShortcutProps) {
  return (
    <button
      type="button"
      className={[styles.root, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <Icon {...icon} size={24} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
