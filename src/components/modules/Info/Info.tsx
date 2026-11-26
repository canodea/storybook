import { Icon } from '../../../foundations';
import StatusTag from '../../feedback/StatusTag';
import styles from './Info.module.css';

export type InfoStyle = 'primary' | 'secondary' | 'requirements' | 'bonds-repo';

export type InfoProps = {
  className?: string;
  style?: InfoStyle;
  message?: string;
  textButton?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  requirements?: string[];
  blockedNote?: string;
  bondsRepoLabel?: string;
  bondsRepoValue?: string;
};

export default function Info({
  className,
  style = 'primary',
  message = 'Text',
  textButton = false,
  actionLabel = 'Create',
  onAction,
  requirements = ['Text', 'Text', 'Text', 'Text'],
  blockedNote = 'Text goes here',
  bondsRepoLabel = 'Label',
  bondsRepoValue = '1.234,56 TL',
}: InfoProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} data-style={style}>
      <div className={styles.header}>
        <Icon set="Security" name="Info" size={24} className={styles.icon} />
        <p className={styles.message}>{message}</p>
      </div>

      {style === 'requirements' && (
        <div className={styles.grid}>
          {requirements.map((item, i) => (
            <span className={styles.requirement} key={i}>
              <StatusTag status="bullet" />
              <span className={styles.requirementText}>{item}</span>
            </span>
          ))}
        </div>
      )}

      {style === 'bonds-repo' && (
        <div className={styles.repoBox}>
          <p className={styles.blockedNote}>{blockedNote}</p>
          <div className={styles.repoRow}>
            <span className={styles.repoLabel}>{bondsRepoLabel}</span>
            <span className={styles.repoValue}>{bondsRepoValue}</span>
          </div>
        </div>
      )}

      {(style === 'primary' || style === 'secondary') && textButton && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
