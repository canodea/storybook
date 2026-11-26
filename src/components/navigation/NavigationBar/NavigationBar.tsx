import { Icon, type IconSet } from '../../../foundations';
import StatusBar from '../../shared/StatusBar';
import Progress, { type ProgressSteps } from '../Progress';
import styles from './NavigationBar.module.css';

export type NavigationBarIcon = { set: IconSet; name: string };

export type NavigationBarProps = {
  className?: string;
  style?: 'base' | 'sheet-view';
  label?: string;
  subtitle?: boolean;
  subtitleText?: string;
  progress?: boolean;
  progressSteps?: ProgressSteps;
  progressCurrent?: number;
  icon?: 'zero' | 'one' | 'two' | 'add-icon';
  trailingIcon1?: NavigationBarIcon;
  trailingIcon2?: NavigationBarIcon;
  onBack?: () => void;
  onClose?: () => void;
  onAdd?: () => void;
};

export default function NavigationBar({
  className,
  style = 'base',
  label = 'Label',
  subtitle = false,
  subtitleText = 'Section',
  progress = false,
  progressSteps = 4,
  progressCurrent = 1,
  icon = 'zero',
  trailingIcon1 = { set: 'Games', name: 'HeartStraight' },
  trailingIcon2 = { set: 'Time', name: 'Alarm' },
  onBack,
  onClose,
  onAdd,
}: NavigationBarProps) {
  const isSheet = style === 'sheet-view';
  const showProgress = progress;

  const content = (
    <>
      <button type="button" className={styles.back} aria-label="Geri" onClick={onBack}>
        <Icon set="Arrows / Caret" name="Left" size={24} />
      </button>
      <div className={styles.titleBlock}>
        {subtitle && <span className={styles.subtitle}>{subtitleText}</span>}
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.trailing}>
        {icon === 'one' && (
          <button type="button" className={styles.iconButton} aria-label="Kapat" onClick={onClose}>
            <Icon set="Math" name="X" size={24} />
          </button>
        )}
        {icon === 'two' && (
          <>
            <button type="button" className={styles.iconButton} aria-label="Favori">
              <Icon {...trailingIcon1} size={24} />
            </button>
            <button type="button" className={styles.iconButton} aria-label="Alarm">
              <Icon {...trailingIcon2} size={24} />
            </button>
          </>
        )}
        {icon === 'add-icon' && (
          <button type="button" className={styles.addButton} aria-label="Ekle" onClick={onAdd}>
            <Icon set="Math" name="Plus" size={16} />
          </button>
        )}
      </div>
    </>
  );

  const row = (
    <div className={[styles.row, isSheet ? styles.sheetRow : styles.baseRow].filter(Boolean).join(' ')}>
      {content}
    </div>
  );

  const progressBar = showProgress ? (
    <Progress steps={progressSteps} current={progressCurrent} />
  ) : null;

  return (
    <div className={[styles.root, isSheet ? styles.sheet : styles.base, className].filter(Boolean).join(' ')}>
      <div className={isSheet ? styles.sheetStatusBar : undefined}>
        <StatusBar appearance={isSheet ? 'on-dark' : 'default'} notch={false} />
      </div>
      {isSheet && <div className={styles.mask} />}
      {isSheet ? <div className={styles.sheetTopBar}>{row}</div> : row}
      {progressBar}
    </div>
  );
}
