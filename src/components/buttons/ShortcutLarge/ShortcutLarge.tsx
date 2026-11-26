import { useState } from 'react';
import { Icon, type IconSet } from '../../../foundations';
import styles from './ShortcutLarge.module.css';

export type ShortcutLargeIcon = { set: IconSet; name: string };

export type ShortcutLargeProps = {
  className?: string;
  label?: string;
  value?: string;
  /** Figma: Action Icon. Kopyalama ikonu her zaman gösterilir (Shortcut Large yalnız IBAN kopyalama içindir). */
  actionIcon?: ShortcutLargeIcon;
  onCopy?: (value: string) => void;
};

export default function ShortcutLarge({
  className,
  label = 'IBAN',
  value = 'TR00 0000 0000 0000 0000 0000 00',
  actionIcon = { set: 'Office', name: 'Copy' },
  onCopy,
}: ShortcutLargeProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    onCopy?.(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
      <button
          type="button"
          className={styles.action}
          aria-label="IBAN'ı kopyala"
          onClick={copy}
        >
          <Icon {...actionIcon} size={24} />
      </button>
      {copied && (
        <span className={styles.copied} role="status">
          Kopyalandı
        </span>
      )}
    </div>
  );
}
