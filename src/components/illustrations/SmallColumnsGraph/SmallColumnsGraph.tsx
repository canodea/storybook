import smallColumnsGraphSvg from './assets/small-columns-graph.svg';
import styles from './SmallColumnsGraph.module.css';

export type SmallColumnsGraphProps = {
  className?: string;
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

export default function SmallColumnsGraph({ className, size = 92 }: SmallColumnsGraphProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={smallColumnsGraphSvg}
      alt=""
      aria-hidden="true"
      width={size}
      height={Math.round(size * 0.5217)}
    />
  );
}
