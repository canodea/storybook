import Indicator from '../Indicator';
import styles from './Progress.module.css';

export type ProgressSteps = 2 | 3 | 4 | 5;

export type ProgressProps = {
  className?: string;
  steps?: ProgressSteps;
  /** 1 tabanlı; [1..steps] dışına taşarsa sınırlara çekilir. */
  current?: number;
};

export default function Progress({ className, steps = 4, current = 1 }: ProgressProps) {
  const value = Math.min(Math.max(current, 1), steps);
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps}
      aria-valuenow={value}
    >
      {Array.from({ length: steps }, (_, i) => {
        const index = i + 1;
        const status = index < value ? 'completed' : index === value ? 'current' : 'next';
        return <Indicator key={index} status={status} />;
      })}
    </div>
  );
}
