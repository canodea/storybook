import { Icon } from '../../../foundations';
import styles from './CurrencySwitcher.module.css';

export type CurrencySwitcherProps = {
  className?: string;
  /** Para birimi kodu, ör. "TL", "EUR". */
  currencyCode?: string;
  onClick?: () => void;
};

export default function CurrencySwitcher({ className, currencyCode = 'TL', onClick }: CurrencySwitcherProps) {
  return (
    <button
      type="button"
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-label={`Para birimi: ${currencyCode}`}
      onClick={onClick}
    >
      <span className={styles.code}>{currencyCode}</span>
      <Icon set="Arrows / Caret" name="Down" size={16} className={styles.icon} />
    </button>
  );
}
