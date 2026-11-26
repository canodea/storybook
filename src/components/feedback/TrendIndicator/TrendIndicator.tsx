import { Icon } from '../../../foundations';
import styles from './TrendIndicator.module.css';

export type TrendIndicatorTrend = 'positive' | 'fixed' | 'negative';

export type TrendIndicatorProps = {
  className?: string;
  trend: TrendIndicatorTrend;
  value?: string;
};

export default function TrendIndicator({ className, trend, value }: TrendIndicatorProps) {
  const resolved = value ?? (trend === 'fixed' ? '0%' : '0,36%');
  return (
    <div className={[styles.root, styles[trend], className].filter(Boolean).join(' ')}>
      {trend !== 'fixed' && <Icon set="Design" name="TriangleFull" size={12} className={styles.icon} />}
      <span className={styles.value}>{resolved}</span>
    </div>
  );
}
