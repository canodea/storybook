import styles from './Divider.module.css';

export type DividerSize = 'full' | 'half' | 'short' | 'xshort';

export type DividerProps = {
  className?: string;
  size?: DividerSize;
};

// x konumuna göre çizgi genişliği (sağa yaslı): full 375, half 351, short 327, xshort 311.
const WIDTH: Record<DividerSize, number> = { full: 375, half: 351, short: 327, xshort: 311 };

export default function Divider({ className, size = 'full' }: DividerProps) {
  return (
    <div role="separator" className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.line} style={{ width: WIDTH[size] }} />
    </div>
  );
}
