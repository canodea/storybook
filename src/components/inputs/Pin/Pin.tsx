import styles from './Pin.module.css';

export type PinState = 'default' | 'focused' | 'filled' | 'error';

export type PinProps = {
  className?: string;
  state?: PinState;
};

export default function Pin({ className, state = 'default' }: PinProps) {
  const content = state === 'focused' ? '|' : state === 'default' ? '' : '•';

  return (
    <span className={[styles.pin, className].filter(Boolean).join(' ')} data-state={state}>
      {content}
    </span>
  );
}
