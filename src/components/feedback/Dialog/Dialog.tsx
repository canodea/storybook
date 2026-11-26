import { useId, type ReactNode } from 'react';
import { Icon, type IconSet } from '../../../foundations';
import Button from '../../buttons/Button';
import { WomanAnalyze } from '../../illustrations/WomanAnalyze';
import styles from './Dialog.module.css';

export type DialogIcon = { set: IconSet; name: string };
export type DialogActions = 'stacked' | 'inline';
export type DialogMedia = 'icon' | 'illustration';

export type DialogProps = {
  className?: string;
  title: string;
  message: string;
  media?: DialogMedia;
  showMedia?: boolean;
  iconAsset?: DialogIcon;
  /** media='illustration' iken gösterilir; varsayılan WomanAnalyze 120x120. */
  illustration?: ReactNode;
  secondaryAction?: boolean;
  actions?: DialogActions;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  /** true verilirse yarı saydam arka planla ortalanmış overlay; verilmezse inline çizilir. */
  open?: boolean;
};

export default function Dialog({
  className,
  title,
  message,
  media = 'icon',
  showMedia = true,
  iconAsset = { set: 'Security', name: 'Info' },
  illustration,
  secondaryAction = true,
  actions = 'stacked',
  primaryLabel = 'BUTTON',
  secondaryLabel = 'BUTTON',
  onPrimary,
  onSecondary,
  open,
}: DialogProps) {
  const titleId = useId();

  const dialog = (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.content}>
        {showMedia &&
          (media === 'illustration' ? (
            <div className={styles.illustration}>
              {illustration ?? <WomanAnalyze size={120} />}
            </div>
          ) : (
            <Icon {...iconAsset} size={32} className={styles.icon} />
          ))}
        <div className={styles.text}>
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
      <div className={styles.actions} data-actions={actions}>
        {actions === 'stacked' ? (
          <>
            <Button label={primaryLabel} priority="primary" size="large" fullWidth onClick={onPrimary} />
            {secondaryAction && (
              <Button label={secondaryLabel} priority="secondary" size="large" fullWidth onClick={onSecondary} />
            )}
          </>
        ) : (
          <>
            {secondaryAction && (
              <Button label={secondaryLabel} priority="secondary" size="large" fullWidth onClick={onSecondary} />
            )}
            <Button label={primaryLabel} priority="primary" size="large" fullWidth onClick={onPrimary} />
          </>
        )}
      </div>
    </div>
  );

  if (open) {
    return <div className={styles.overlay}>{dialog}</div>;
  }

  return dialog;
}
