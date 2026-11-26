import { Icon, type IconSet } from '../../foundations';
import PaymentMethod, { type PaymentMethodName } from '../logos/PaymentMethod/PaymentMethod';
import CardPhysical, { type CardPhysicalType } from '../logos/CardPhysical/CardPhysical';
import styles from './CardMvpPlus.module.css';

const cx = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(' ');

export type CardMvpPlusLeading = 'payment-method' | 'icon' | 'card-image';
export type CardMvpPlusContainer = 'flat' | 'card';
export type CardMvpPlusType = 'card' | 'account' | 'loan';

export type CardMvpPlusIcon = { set: IconSet; name: string };

type Preset = {
  leading: CardMvpPlusLeading;
  leadingIcon?: CardMvpPlusIcon;
  cardNumber?: string;
  value1?: string;
};

// Hazır ayarlar yalnız varsayılanları belirler; açık verilen prop her zaman kazanır.
const PRESETS: Record<CardMvpPlusType, Preset> = {
  card: {
    leading: 'payment-method',
    cardNumber: '0000 **** **** 0000',
  },
  account: {
    leading: 'icon',
    leadingIcon: { set: 'Math', name: 'Bank' },
    cardNumber: '000 - 0000 - 000',
  },
  loan: {
    leading: 'icon',
    leadingIcon: { set: 'Banking', name: 'Money' },
    cardNumber: '0000 - 000000 - 000',
    value1: '01.01.2025',
  },
};

export type CardMvpPlusProps = {
  className?: string;
  leading?: CardMvpPlusLeading;
  leadingIcon?: CardMvpPlusIcon;
  container?: CardMvpPlusContainer;
  type?: CardMvpPlusType;
  name?: string;
  cardNumber?: string;
  label1?: string;
  value1?: string;
  label2?: string;
  value2?: string;
  paymentMethod?: PaymentMethodName;
  cardType?: CardPhysicalType;
  showAction?: boolean;
  actionIcon?: CardMvpPlusIcon;
  onActionClick?: () => void;
  actionLabel?: string;
};

export default function CardMvpPlus({
  className,
  leading,
  leadingIcon,
  container = 'flat',
  type,
  name = 'Title',
  cardNumber,
  label1 = 'Label',
  value1,
  label2 = 'Label',
  value2 = '1.234,56 TL',
  paymentMethod = 'mastercard',
  cardType = 'gold',
  showAction = true,
  actionIcon = { set: 'System', name: 'DotsThree' },
  onActionClick,
  actionLabel = 'Diğer işlemler',
}: CardMvpPlusProps) {
  const preset = type ? PRESETS[type] : undefined;
  const resolvedLeading = leading ?? preset?.leading ?? 'payment-method';
  const resolvedLeadingIcon = leadingIcon ?? preset?.leadingIcon ?? { set: 'Math', name: 'Bank' };
  const resolvedCardNumber = cardNumber ?? preset?.cardNumber ?? '0000 **** **** 0000';
  const resolvedValue1 = value1 ?? preset?.value1 ?? '1.234,56 TL';
  const isMedia = resolvedLeading === 'card-image';

  return (
    <article className={cx(styles.root, container === 'card' && styles.card, className)}>
      <div className={cx(styles.top, isMedia && styles.topMedia)}>
        {isMedia ? (
          <CardPhysical type={cardType} />
        ) : resolvedLeading === 'icon' ? (
          <Icon
            set={resolvedLeadingIcon.set}
            name={resolvedLeadingIcon.name}
            size={24}
            className={styles.leadingIcon}
          />
        ) : (
          <PaymentMethod method={paymentMethod} size={24} />
        )}
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          {isMedia ? <p className={styles.number}>{resolvedCardNumber}</p> : null}
        </div>
        {showAction ? (
          <button
            type="button"
            className={styles.actionButton}
            aria-label={actionLabel}
            onClick={onActionClick}
          >
            <Icon set={actionIcon.set} name={actionIcon.name} size={24} />
          </button>
        ) : null}
      </div>
      {isMedia ? null : <p className={styles.number}>{resolvedCardNumber}</p>}
      <div className={styles.bottom}>
        <div className={styles.row}>
          <p className={styles.label}>{label1}</p>
          <p className={styles.value}>{resolvedValue1}</p>
        </div>
        <div className={styles.row}>
          <p className={styles.label}>{label2}</p>
          <p className={cx(styles.value, styles.valueLarge)}>{value2}</p>
        </div>
      </div>
    </article>
  );
}
