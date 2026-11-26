import { Icon, type IconSet } from '../../foundations';
import { useSyncedState } from '../inputs/useSyncedState';
import CurrencySwitcher from '../navigation/CurrencySwitcher';
import styles from './NewAssetCard.module.css';

export type NewAssetCardProps = {
  className?: string;
  title?: string;
  /** Tam kısım, ör. "1.234". */
  amount?: string;
  /** Ondalık kısım, ör. ",56". */
  decimal?: string;
  currency?: string;
  /** Görünür/gizli başlangıç değeri; göz butonu yerel durumu değiştirir. */
  hidden?: boolean;
  onToggleHidden?: () => void;
  /** Figma: Show Eye. ctaToggles açıkken varsayılan olarak gizlenir. */
  showEye?: boolean;
  currencySwitcher?: boolean;
  ctaLabel?: string;
  /** Figma: CTA Icon. */
  ctaIcon?: boolean;
  /** CTA ikonunu değiştirir. */
  ctaIconName?: { set: IconSet; name: string };
  /** CTA'yı göster/gizle düğmesine çevirir; tutarı maskeler. */
  ctaToggles?: boolean;
  hideLabel?: string;
  showLabel?: string;
  onCtaClick?: () => void;
  /** Başlığın sağında bilgi ikonu gösterir. */
  infoIcon?: boolean;
  infoIconName?: { set: IconSet; name: string };
  onInfoClick?: () => void;
};

export default function NewAssetCard({
  className,
  title = 'Assets',
  amount = '1.234',
  decimal = ',56',
  currency = 'TL',
  hidden = false,
  onToggleHidden,
  ctaToggles = false,
  showEye = !ctaToggles,
  currencySwitcher = false,
  ctaLabel = 'Call-To-Action',
  ctaIcon = false,
  ctaIconName = { set: 'Math', name: 'ChartPieSlice' },
  hideLabel = 'GİZLE',
  showLabel = 'GÖSTER',
  onCtaClick,
  infoIcon = false,
  infoIconName = { set: 'Security', name: 'Info' },
  onInfoClick,
}: NewAssetCardProps) {
  const [isHidden, setIsHidden] = useSyncedState(hidden);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
    onToggleHidden?.();
  };

  const info = <Icon set={infoIconName.set} name={infoIconName.name} size={16} className={styles.infoIcon} />;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.left}>
        <div className={styles.assets}>
          <div className={styles.titleRow}>
            <p className={styles.title}>{title}</p>
            {infoIcon ? (
              onInfoClick ? (
                <button
                  type="button"
                  className={styles.infoButton}
                  aria-label="Bilgi"
                  onClick={onInfoClick}
                >
                  {info}
                </button>
              ) : (
                info
              )
            ) : null}
          </div>
          <div className={styles.amountRow}>
            <p className={styles.amount}>
              <span className={styles.amountWhole}>{isHidden ? '***' : amount}</span>
              <span className={styles.amountDecimal}>
                {isHidden ? ',**' : decimal} {currency}
              </span>
            </p>
            {currencySwitcher ? <CurrencySwitcher currencyCode={currency} /> : null}
          </div>
        </div>
        <div className={styles.ctaRow}>
          {ctaToggles || ctaIcon ? (
            <Icon
              set={ctaToggles ? 'Design' : ctaIconName.set}
              name={
                ctaToggles
                  ? isHidden
                    ? 'Eye'
                    : 'Eye Slash'
                  : ctaIconName.name
              }
              size={16}
              className={styles.ctaIcon}
            />
          ) : null}
          <button
            type="button"
            className={styles.cta}
            aria-pressed={ctaToggles ? isHidden : undefined}
            onClick={ctaToggles ? toggleHidden : onCtaClick}
          >
            {ctaToggles ? (isHidden ? showLabel : hideLabel) : ctaLabel}
          </button>
        </div>
      </div>
      {showEye ? (
        <button
          type="button"
          className={styles.eyeButton}
          aria-label={isHidden ? 'Bakiyeyi göster' : 'Bakiyeyi gizle'}
          onClick={toggleHidden}
        >
          <Icon set="Design" name={isHidden ? 'Eye Closed' : 'Eye'} size={24} />
        </button>
      ) : null}
    </div>
  );
}
