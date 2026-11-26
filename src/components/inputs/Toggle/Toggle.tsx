import { useSyncedState } from '../useSyncedState';
import styles from './Toggle.module.css';

export type ToggleProps = {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function Toggle({ className, checked: checkedProp = false, disabled = false, onChange }: ToggleProps) {
  // Prop başlangıç değeridir; tıklayınca da değişir (Playground kontrolü değişince ona uyar).
  const [checked, setChecked] = useSyncedState(checkedProp);

  return (
    <input
      type="checkbox"
      role="switch"
      className={[styles.toggle, className].filter(Boolean).join(' ')}
      checked={checked}
      disabled={disabled}
      aria-checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        onChange?.(e.target.checked);
      }}
    />
  );
}
