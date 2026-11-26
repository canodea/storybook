import styles from './Badge.module.css';

export type BadgeType = 'count' | 'dot';
export type BadgeColor = 'danger' | 'neutral';

export type BadgeProps = {
  className?: string;
  type?: BadgeType;
  color?: BadgeColor;
  /** Sayı ya da hazır metin. Sayı 99 üzerindeyse "99+" gösterilir. */
  count?: number | string;
};

export default function Badge({
  className,
  type = 'count',
  color = 'danger',
  count = 3,
}: BadgeProps) {
  const label = typeof count === 'number' ? (count > 99 ? '99+' : String(count)) : count;

  return (
    <span
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-type={type}
      data-color={color}
      aria-hidden={type === 'dot' ? 'true' : undefined}
    >
      {type === 'count' ? label : null}
    </span>
  );
}
