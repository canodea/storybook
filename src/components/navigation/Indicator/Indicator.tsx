import styles from './Indicator.module.css';

export type IndicatorStatus = 'current' | 'completed' | 'next';

export type IndicatorProps = {
  className?: string;
  status?: IndicatorStatus;
};

export default function Indicator({ className, status = 'next' }: IndicatorProps) {
  const cls = status === 'current' ? styles.current : status === 'completed' ? styles.completed : '';
  return <div className={[styles.root, cls, className].filter(Boolean).join(' ')} />;
}
