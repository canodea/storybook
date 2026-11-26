import { Icon, type IconSet } from '../../../foundations';
import styles from './ActionCard.module.css';

export type ActionCardIcon = { set: IconSet; name: string };

export type ActionCardProps = {
  className?: string;
  title?: string;
  info?: string;
  actionIcon?: ActionCardIcon;
  onClick?: () => void;
};

export default function ActionCard({
  className,
  title = 'Link',
  info = 'Lorem ipsum sit dolorem amet quare id faciam fortasse requiris',
  actionIcon = { set: 'Design', name: 'Cube' },
  onClick,
}: ActionCardProps) {
  return (
    <button
      type="button"
      className={[styles.root, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <span className={styles.avatar}>
        <Icon {...actionIcon} size={24} />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.info}>{info}</span>
      </span>
    </button>
  );
}
