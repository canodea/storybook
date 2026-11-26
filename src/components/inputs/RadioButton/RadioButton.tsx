import { useSyncedState } from '../useSyncedState';
import styles from './RadioButton.module.css';

export type RadioButtonProps = {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  /** true ise seçili durumu yalnız `checked` prop'u belirler (grup içindeki radio'lar için; üst bileşen durumu tutar). */
  controlled?: boolean;
};

export default function RadioButton({
  className,
  checked: checkedProp = false,
  disabled = false,
  name,
  value,
  onChange,
  controlled = false,
}: RadioButtonProps) {
  const [internal, setChecked] = useSyncedState(checkedProp);
  const checked = controlled ? checkedProp : internal;
  return (
    <span className={[styles.root, className].filter(Boolean).join(' ')}>
      <input
        type="radio"
        className={styles.input}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          setChecked(e.target.checked);
          onChange?.(e.target.checked);
        }}
      />
      <span className={styles.circle} aria-hidden="true" />
    </span>
  );
}
