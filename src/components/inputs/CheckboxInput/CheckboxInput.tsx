import Checkbox, { type CheckboxStatus } from '../Checkbox';
import styles from './CheckboxInput.module.css';

export type CheckboxInputProps = {
  className?: string;
  status?: CheckboxStatus;
  disabled?: boolean;
  multiLine?: boolean;
  label?: string;
  title?: string;
  info?: string;
  onChange?: (checked: boolean) => void;
};

export default function CheckboxInput({
  className,
  status = 'base',
  disabled = false,
  multiLine = false,
  label = 'Text goes here',
  title = 'Title',
  info = 'Sub Text',
  onChange,
}: CheckboxInputProps) {
  return (
    <label
      className={[styles.root, multiLine ? styles.multiLine : '', className].filter(Boolean).join(' ')}
    >
      <Checkbox status={status} disabled={disabled} onChange={onChange} />
      {multiLine ? (
        <span className={styles.col}>
          <span className={styles.title}>{title}</span>
          <span className={styles.info}>{info}</span>
        </span>
      ) : (
        <span className={styles.label}>{label}</span>
      )}
    </label>
  );
}
