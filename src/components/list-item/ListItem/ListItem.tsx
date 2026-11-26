import { Icon, type IconSet } from '../../../foundations';
import styles from './ListItem.module.css';

export type ListItemIcon = { set: IconSet; name: string };

export type ListItemProps = {
  className?: string;
  label: string;
  supportingText?: string;
  multiLine?: boolean;
  heading?: boolean;
  leadingIcon?: ListItemIcon;
  /** Trailing ok. `null` gizler; varsayılan Arrows/Caret Right. */
  trailingArrow?: ListItemIcon | null;
  onClick?: () => void;
};

const DEFAULT_ARROW: ListItemIcon = { set: 'Arrows / Caret', name: 'Right' };

export default function ListItem({
  className,
  label,
  supportingText,
  multiLine = false,
  heading = false,
  leadingIcon,
  trailingArrow = DEFAULT_ARROW,
  onClick,
}: ListItemProps) {
  const arrow = trailingArrow === null ? null : trailingArrow;
  // multiLine ve heading satırında label display stili; tek satır heading=false ise text md.
  const labelClass = multiLine || heading ? styles.labelDisplay : styles.labelText;

  const content = (
    <>
      {leadingIcon && <Icon {...leadingIcon} size={24} className={styles.leadingIcon} />}
      <div className={styles.content}>
        <span className={labelClass}>{label}</span>
        {multiLine && supportingText && <span className={styles.supportingText}>{supportingText}</span>}
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
