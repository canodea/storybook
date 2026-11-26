import type { ReactNode } from 'react';
import placeholder from './assets/illustration-size.svg';
import styles from './IllustrationPlace.module.css';

const SIZES = {
  xsmall: 68,
  small: 80,
  medium: 120,
  large: 200,
  xlarge: 240,
  '2xlarge': 280,
} as const;

export type IllustrationPlaceProps = {
  className?: string;
  /** Figma: Size. */
  size?: keyof typeof SIZES;
  /** Kutuya sığdırılacak illüstrasyon. Verilmezse yer tutucu gösterilir. */
  children?: ReactNode;
};

export default function IllustrationPlace({
  className,
  size = 'medium',
  children,
}: IllustrationPlaceProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ width: SIZES[size], height: SIZES[size] }}
    >
      {children ?? (
        <img
          className={styles.placeholder}
          src={placeholder}
          alt=""
          aria-hidden="true"
        />
      )}
    </div>
  );
}
