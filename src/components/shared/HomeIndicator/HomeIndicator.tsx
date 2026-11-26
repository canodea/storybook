import styles from './HomeIndicator.module.css';

export type HomeIndicatorProps = {
  className?: string;
};

export default function HomeIndicator({ className }: HomeIndicatorProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.bar} />
    </div>
  );
}
