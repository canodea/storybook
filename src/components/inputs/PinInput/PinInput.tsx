import { useRef } from 'react';
import { Icon } from '../../../foundations';
import { useSyncedState } from '../useSyncedState';
import Pin, { type PinState } from '../Pin';
import styles from './PinInput.module.css';

export type PinInputProps = {
  className?: string;
  length?: number;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
};

export default function PinInput({
  className,
  length = 6,
  value: valueProp = '',
  error = false,
  errorMessage = 'Helper Text',
  onChange,
  onComplete,
}: PinInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useSyncedState(valueProp);

  const handleChange = (next: string) => {
    const digits = next.replace(/\D/g, '').slice(0, length);
    setValue(digits);
    onChange?.(digits);
    if (digits.length === length) onComplete?.(digits);
  };

  const cells: PinState[] = Array.from({ length }, (_, i) => {
    if (error) return 'error';
    return value[i] ? 'filled' : i === value.length ? 'focused' : 'default';
  });

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.row} aria-hidden="true">
        {cells.map((state, i) => (
          <Pin key={i} state={state} />
        ))}
      </div>
      {error && (
        <p className={styles.error} role="alert">
          <Icon set="Security" name="Warning" size={16} className={styles.errorIcon} />
          {errorMessage}
        </p>
      )}
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={length}
        value={value}
        aria-label="Doğrulama kodu"
        aria-invalid={error}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
