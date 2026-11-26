import { Icon } from '../../../foundations';
import { useSyncedState } from '../../inputs/useSyncedState';
import CurrencySwitcher from '../../navigation/CurrencySwitcher';
import SectionDivider from '../../navigation/SectionDivider';
import TrendIndicator from '../../feedback/TrendIndicator';
import styles from './Overview.module.css';

export type OverviewProps = {
  className?: string;
  sectionLabel?: string;
  detail?: boolean;
  percentage?: boolean;
  view?: boolean;
  pendingAmount?: boolean;
  currencyAmount?: string;
  currency?: string;
  changeAmount?: string;
  changePercent?: string;
  pendingCaption?: string;
  pendingAmountValue?: string;
  onToggleView?: () => void;
};

export default function Overview({
  className,
  sectionLabel = 'label',
  detail = false,
  percentage = false,
  view = true,
  pendingAmount = false,
  currencyAmount = '1.234,56',
  currency = 'EUR',
  changeAmount = '1.234,56 TL',
  changePercent = '1,23%',
  pendingCaption = 'Label:',
  pendingAmountValue = '1.234,56 TL',
  onToggleView,
}: OverviewProps) {
  const [isVisible, setIsVisible] = useSyncedState(view);
  const noChange = !changeAmount || changeAmount === '0,00 TL';
  const wideBottom = !detail && !percentage;

  return (
    <div
      className={[styles.root, wideBottom && styles.wideBottom, className].filter(Boolean).join(' ')}
    >
      <SectionDivider label={sectionLabel} type={detail ? 'info' : 'base'} />

      <div className={styles.valueRow}>
        <div className={styles.amountGroup}>
          <span className={styles.amount}>{isVisible ? currencyAmount : '**,**'}</span>
          <CurrencySwitcher currencyCode={currency} />
        </div>
        {detail ? (
          <Icon set="Math" name="ChartBar" size={24} className={styles.detailIcon} />
        ) : (
          <button
            type="button"
            className={styles.eyeButton}
            aria-label={isVisible ? 'Bakiyeyi gizle' : 'Bakiyeyi göster'}
            onClick={() => {
              setIsVisible(!isVisible);
              onToggleView?.();
            }}
          >
            <Icon set="Design" name={isVisible ? 'Eye' : 'Eye Closed'} size={24} />
          </button>
        )}
      </div>

      {percentage && (
        <div className={[styles.changeRow, noChange && styles.changeRowMuted].filter(Boolean).join(' ')}>
          <span className={styles.changeAmount}>{changeAmount}</span>
          <span className={styles.paren}>(</span>
          <TrendIndicator
            trend={noChange ? 'fixed' : 'positive'}
            value={noChange ? undefined : changePercent}
          />
          <span className={styles.paren}>)</span>
        </div>
      )}

      {pendingAmount && detail && (
        <div className={styles.pendingRow}>
          <span className={styles.pendingCaption}>{pendingCaption}</span>
          <span className={styles.pendingValue}>{pendingAmountValue}</span>
        </div>
      )}
    </div>
  );
}
