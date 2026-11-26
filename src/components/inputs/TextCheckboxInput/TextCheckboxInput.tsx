import Checkbox from '../Checkbox';
import styles from './TextCheckboxInput.module.css';

export type TextCheckboxInputProps = {
  className?: string;
  sectionText?: string;
  checkboxLabel?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function TextCheckboxInput({
  className,
  sectionText = 'Text goes here',
  checkboxLabel = 'Text goes here',
  checked = false,
  disabled = false,
  onChange,
}: TextCheckboxInputProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <p className={styles.sectionText}>{sectionText}</p>
      <label className={styles.checkRow}>
        <Checkbox status={checked ? 'active' : 'base'} disabled={disabled} onChange={onChange} />
        <span className={styles.label}>{checkboxLabel}</span>
      </label>
    </div>
  );
}
