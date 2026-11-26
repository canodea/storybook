import { Icon, type IconSet } from '../../../foundations';
import StatusBar from '../../shared/StatusBar';
import styles from './LandingTitle.module.css';

export type LandingTitleIcon = { set: IconSet; name: string };

export type LandingTitleProps = {
  className?: string;
  title?: string;
  /** Figma: Avatar. Başlığın solunda baş harf dairesi. */
  avatar?: boolean;
  initials?: string;
  icons?: 'one' | 'two';
  icon1?: LandingTitleIcon;
  icon2?: LandingTitleIcon;
  onIcon1Click?: () => void;
  onIcon2Click?: () => void;
};

export default function LandingTitle({
  className,
  title = 'Title',
  avatar = false,
  initials = 'AB',
  icons = 'one',
  icon1 = { set: 'System', name: 'BellSimple' },
  icon2 = { set: 'System', name: 'MagnifyingGlass' },
  onIcon1Click,
  onIcon2Click,
}: LandingTitleProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.statusBar}>
        <StatusBar appearance="on-dark" />
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          {avatar ? <span className={styles.avatar}>{initials}</span> : null}
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.icons}>
          <button type="button" className={styles.iconButton} aria-label="Icon 1" onClick={onIcon1Click}>
            <Icon {...icon1} size={24} />
          </button>
          {icons === 'two' && (
            <button type="button" className={styles.iconButton} aria-label="Icon 2" onClick={onIcon2Click}>
              <Icon {...icon2} size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
