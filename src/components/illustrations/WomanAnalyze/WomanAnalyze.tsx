import womanAnalyzeSvg from './assets/woman-analyze.svg';
import styles from './WomanAnalyze.module.css';

export type WomanAnalyzeProps = {
  className?: string;
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

export default function WomanAnalyze({ className, size = 240 }: WomanAnalyzeProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={womanAnalyzeSvg}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
