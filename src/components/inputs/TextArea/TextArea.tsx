import { useState } from 'react';
import { useSyncedState } from '../useSyncedState';
import styles from './TextArea.module.css';

export type TextAreaState = 'default' | 'focused' | 'filled' | 'error' | 'disabled';

export type TextAreaProps = {
  className?: string;
  label?: string;
  value?: string;
  helperMessage?: string;
  counterValue?: string;
  showHelper?: boolean;
  showCounter?: boolean;
  /**
   * Görsel durum. `default`/`filled` metinden türetilir (boş → default, dolu → filled);
   * `focused` gerçek odakta da görünür; `error` ve `disabled` her zaman uygulanır.
   */
  state?: TextAreaState;
  maxLength?: number;
  onChange?: (value: string) => void;
};

export default function TextArea({
  className,
  label = 'Label',
  value: valueProp = '',
  helperMessage = 'Helper Text',
  counterValue,
  showHelper = true,
  showCounter = true,
  state = 'default',
  maxLength = 250,
  onChange,
}: TextAreaProps) {
  const [value, setValue] = useSyncedState(valueProp);
  const [focused, setFocused] = useState(false);

  const effective: TextAreaState =
    state === 'disabled'
      ? 'disabled'
      : state === 'error'
        ? 'error'
        : focused || state === 'focused'
          ? 'focused'
          : value
            ? 'filled'
            : 'default';
  // Boş alanda etiket içeride (placeholder); değer varsa ya da odaktaysa çerçeveye çıkar.
  const floated = effective === 'disabled' ? value !== '' : effective !== 'default';
  const counter = counterValue ?? `${value.length}/${maxLength}`;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <label className={styles.field} data-state={effective}>
        <span className={floated ? styles.floatingLabel : styles.placeholderLabel}>{label}</span>
        <textarea
          className={styles.input}
          value={value}
          disabled={effective === 'disabled'}
          maxLength={maxLength}
          aria-invalid={effective === 'error' || undefined}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </label>

      {(showHelper || showCounter) && (
        <div className={styles.bottom}>
          {showHelper && (
            <p className={styles.helper} data-state={effective}>
              {helperMessage}
            </p>
          )}
          {showCounter && (
            <span className={styles.counter} data-state={effective}>
              {counter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
