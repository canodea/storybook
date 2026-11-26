import { useState } from 'react';
import { Icon, type IconSet } from '../../../foundations';
import { useSyncedState } from '../useSyncedState';
import styles from './TextField.module.css';

export type TextFieldState = 'default' | 'disabled' | 'focused' | 'filled' | 'error';
export type TextFieldIcon = { set: IconSet; name: string };

export type TextFieldProps = {
  className?: string;
  label?: string;
  value?: string;
  helperMessage?: string;
  showHelper?: boolean;
  /**
   * Görsel durum. Metin alanında `default`/`filled` değerden türetilir (boş → default, dolu → filled);
   * `focused` gerçek odakta da görünür; `error` ve `disabled` her zaman uygulanır.
   */
  state?: TextFieldState;
  numberSelector?: boolean;
  countryCode?: string;
  phoneNumber?: string;
  /** Number Selector + Focused: yazılmakta olan numara (Figma: Phone Entry). */
  phoneEntry?: string;
  fullWidth?: boolean;
  trailingIcon?: TextFieldIcon;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export default function TextField({
  className,
  label = 'Label',
  value: valueProp = '',
  helperMessage = 'Helper Text',
  showHelper = false,
  state = 'default',
  numberSelector = false,
  countryCode = '0500',
  phoneNumber = '000',
  phoneEntry = '05',
  fullWidth = false,
  trailingIcon,
  placeholder,
  onChange,
}: TextFieldProps) {
  const [value, setValue] = useSyncedState(valueProp);
  const [focused, setFocused] = useState(false);

  const effective: TextFieldState = numberSelector
    ? state
    : state === 'disabled'
      ? 'disabled'
      : state === 'error'
        ? 'error'
        : focused || state === 'focused'
          ? 'focused'
          : value
            ? 'filled'
            : 'default';
  // Boş alanda etiket içeride (placeholder); değer varsa ya da odaktaysa çerçeveye çıkar.
  const floated = numberSelector
    ? effective === 'focused' || effective === 'filled' || effective === 'error'
    : effective === 'disabled'
      ? value !== ''
      : effective !== 'default';

  return (
    <div className={[styles.root, fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ')}>
      <label className={styles.field} data-state={effective}>
        <span className={floated ? styles.floatingLabel : styles.placeholderLabel}>{label}</span>

        {numberSelector ? (
          floated && (
            <span className={styles.phone}>
              {effective === 'focused' ? (
                <span className={styles.phoneNumber}>
                  {phoneEntry}
                  <span className={styles.caret}>|</span>
                </span>
              ) : (
                <>
                  <span className={styles.countryCode}>{countryCode}</span>
                  <span className={styles.phoneNumber}>{phoneNumber}</span>
                </>
              )}
            </span>
          )
        ) : (
          <>
            <input
              className={styles.input}
              value={value}
              placeholder={floated ? placeholder : undefined}
              disabled={effective === 'disabled'}
              aria-invalid={effective === 'error' || undefined}
              onChange={(e) => {
                setValue(e.target.value);
                onChange?.(e.target.value);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            {trailingIcon && <Icon {...trailingIcon} size={24} className={styles.trailing} />}
          </>
        )}
      </label>

      {showHelper && (
        <p className={styles.helper} data-state={effective}>
          {helperMessage}
        </p>
      )}
    </div>
  );
}
