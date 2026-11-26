import { useId, useState, type ReactNode } from 'react';
import { Icon, type IconSet } from '../../foundations';
import styles from './MonthlyActivityItem.module.css';

export type MonthlyActivityItemProps = {
  className?: string;
  usd?: boolean;
  monthLabel?: string;
  amount?: string;
  usdAmount?: string;
  /** Sağdaki chevron; varsayılan true. */
  showChevron?: boolean;
  /** Figma: Chevron Icon (instance swap). */
  chevronIcon?: { set: IconSet; name: string };
  /**
   * Ayın işlemleri (ör. Activity Item listesi). Verilirse satır açılır liste (dropdown) gibi çalışır:
   * tıklayınca altında işlemler açılır, chevron yukarı döner.
   */
  children?: ReactNode;
  /** Kontrollü açık/kapalı durumu. */
  expanded?: boolean;
  /** Kontrolsüz kullanımda ilk durum. */
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

export default function MonthlyActivityItem({
  className,
  usd = false,
  monthLabel,
  amount = '1.234,56 TL',
  usdAmount = '1.234,56 USD',
  showChevron = true,
  chevronIcon = { set: 'Arrows / Caret', name: 'Down' },
  children,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
}: MonthlyActivityItemProps) {
  const month = monthLabel ?? (usd ? 'Temmuz 2023' : 'Ağustos 2023');
  const [innerOpen, setInnerOpen] = useState(defaultExpanded);
  const panelId = useId();
  const interactive = children != null;
  const open = interactive && (expanded ?? innerOpen);
  const toggle = () => {
    const next = !open;
    if (expanded === undefined) setInnerOpen(next);
    onExpandedChange?.(next);
  };

  const header = (
    <div className={[styles.root, usd && styles.usd, interactive && styles.trigger, !interactive && className].filter(Boolean).join(' ')}>
      <div className={styles.left}>
        <span className={styles.indicator} aria-hidden="true" />
        <p className={styles.month}>{month}</p>
      </div>
      <div className={styles.right}>
        {usd ? (
          <div className={styles.stack}>
            <p>{amount}</p>
            <p>{usdAmount}</p>
          </div>
        ) : (
          <p className={styles.amount}>{amount}</p>
        )}
        {showChevron && (
          <span className={[styles.caret, open && styles.caretOpen].filter(Boolean).join(' ')} aria-hidden="true">
            <Icon {...chevronIcon} size={16} />
          </span>
        )}
      </div>
    </div>
  );

  if (!interactive) return header;

  return (
    <div className={[styles.group, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.headerButton}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${month} işlemleri`}
        onClick={toggle}
      >
        {header}
      </button>
      <div id={panelId} className={styles.panel} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
