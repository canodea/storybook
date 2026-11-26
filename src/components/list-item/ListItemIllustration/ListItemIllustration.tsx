import type { ReactNode } from 'react';
import { Icon, type IconSet } from '../../../foundations';
import { IllustrationPlace } from '../../illustrations/IllustrationPlace';
import styles from './ListItemIllustration.module.css';

export type ListItemIllustrationIcon = { set: IconSet; name: string };

export type ListItemIllustrationProps = {
  className?: string;
  headingText: string;
  supportingText?: string;
  /** 80x80 illüstrasyon. Verilmezse IllustrationPlace küçük yer tutucu gösterilir. */
  illustration?: ReactNode;
  /** Trailing ok. `null` gizler; varsayılan gizli. */
  trailingArrow?: ListItemIllustrationIcon | null;
  onClick?: () => void;
};

export default function ListItemIllustration({
  className,
  headingText,
  supportingText,
  illustration,
  trailingArrow = null,
  onClick,
}: ListItemIllustrationProps) {
  const arrow = trailingArrow === null ? null : trailingArrow;

  const content = (
    <>
      <IllustrationPlace size="small">{illustration}</IllustrationPlace>
      <div className={styles.content}>
        <span className={styles.heading}>{headingText}</span>
        {supportingText && <span className={styles.supportingText}>{supportingText}</span>}
      </div>
      {arrow && <Icon {...arrow} size={24} className={styles.trailingArrow} />}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={[styles.root, styles.button, className].filter(Boolean).join(' ')}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return <div className={[styles.root, className].filter(Boolean).join(' ')}>{content}</div>;
}
