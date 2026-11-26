import type { ReactNode } from 'react';
import styles from './DateNumber.module.css';

export type DateNumberState = 'today' | 'selected' | 'active' | 'disabled';

export type DateNumberProps = {
  className?: string;
  state?: DateNumberState;
  children: ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
};

export default function DateNumber({
  className,
  state = 'active',
  children,
  ...buttonProps
}: DateNumberProps) {
  return (
    <button
      type="button"
      className={[styles.root, styles[state], className].filter(Boolean).join(' ')}
      disabled={state === 'disabled'}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
