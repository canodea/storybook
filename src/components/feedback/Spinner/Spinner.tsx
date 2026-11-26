import styles from './Spinner.module.css';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerTone = 'brand' | 'neutral';

export type SpinnerProps = {
  className?: string;
  size?: SpinnerSize;
  tone?: SpinnerTone;
  /** Ekran okuyucular için durum metni. */
  label?: string;
};

export default function Spinner({
  className,
  size = 'medium',
  tone = 'brand',
  label = 'Yükleniyor',
}: SpinnerProps) {
  return (
    <span
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-size={size}
      data-tone={tone}
      role="status"
      aria-label={label}
    />
  );
}
