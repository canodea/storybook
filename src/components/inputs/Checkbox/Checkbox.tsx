import { useEffect, useRef } from 'react';
import { Icon } from '../../../foundations';
import { useSyncedState } from '../useSyncedState';
import styles from './Checkbox.module.css';

export type CheckboxStatus = 'base' | 'active' | 'indeterminate';

export type CheckboxProps = {
  className?: string;
  status?: CheckboxStatus;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function Checkbox({ className, status: statusProp = 'base', disabled = false, onChange }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useSyncedState<CheckboxStatus>(statusProp);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = status === 'indeterminate';
  }, [status]);

  return (
    <span className={[styles.root, className].filter(Boolean).join(' ')}>
      <input
        ref={ref}
        type="checkbox"
        className={styles.input}
        checked={status === 'active'}
        disabled={disabled}
        aria-checked={status === 'indeterminate' ? 'mixed' : status === 'active'}
        onChange={(e) => {
          setStatus(e.target.checked ? 'active' : 'base');
          onChange?.(e.target.checked);
        }}
      />
      <span className={styles.box} aria-hidden="true">
        {status === 'active' && <Icon set="System" name="Check" size={14} className={styles.check} />}
        {status === 'indeterminate' && <span className={styles.dash} />}
      </span>
    </span>
  );
}
