import styles from './PaymentMethod.module.css';

const sources = import.meta.glob('./assets/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const paymentMethods = [
  'visa',
  'dinersclub',
  'amex',
  'discover',
  'mastercard',
  'maestro',
  'stripe',
  'paypal',
  'interac',
  'verifone',
  'googlepay',
  'applepay',
  'bitpay',
  'bitcoin',
  'bitcoincash',
  'yandex',
  'qiwi',
  'elo',
  'sofort',
  'klarna',
  'skrill',
  'bancontact',
  'sepa',
  'forbrugsforeningen',
  'payoneer',
  'affirm',
  'paysafe',
  'alipay',
  'amazonpay',
  'citadele',
  'giropay',
  'ideal',
  'jcb',
  'shoppay',
  'unionpay',
  'wechat',
  'webmoney',
  'ethereum',
  'litecoin',
] as const;

export type PaymentMethodName = (typeof paymentMethods)[number];

/** Figma katman adları; `alt` verilmezse erişilebilir ad olarak kullanılır. */
export const paymentMethodLabels: Record<PaymentMethodName, string> = {
  visa: 'Visa',
  dinersclub: 'Diners Club',
  amex: 'Amex',
  discover: 'Discover',
  mastercard: 'Mastercard',
  maestro: 'Maestro',
  stripe: 'Stripe',
  paypal: 'PayPal',
  interac: 'Interac',
  verifone: 'Verifone',
  googlepay: 'Google Pay',
  applepay: 'Apple Pay',
  bitpay: 'Bitpay',
  bitcoin: 'Bitcoin',
  bitcoincash: 'Bitcoin Cash',
  yandex: 'Yandex',
  qiwi: 'Qiwi',
  elo: 'Elo',
  sofort: 'Sofort',
  klarna: 'Klarna',
  skrill: 'Skrill',
  bancontact: 'Bancontact',
  sepa: 'SEPA',
  forbrugsforeningen: 'Forbrugsforeningen',
  payoneer: 'Payoneer',
  affirm: 'Affirm',
  paysafe: 'Paysafe',
  alipay: 'Alipay',
  amazonpay: 'Amazon Pay',
  citadele: 'Citadele',
  giropay: 'Giropay',
  ideal: 'Ideal',
  jcb: 'JCB',
  shoppay: 'Shop Pay',
  unionpay: 'UnionPay',
  wechat: 'WeChat',
  webmoney: 'Webmoney',
  ethereum: 'Ethereum',
  litecoin: 'Litecoin',
};

export type PaymentMethodProps = {
  className?: string;
  method?: PaymentMethodName;
  /** Yükseklik (px). Genişlik 35:24 oranı korunarak hesaplanır. */
  size?: number;
  alt?: string;
};

export default function PaymentMethod({
  className,
  method = 'visa',
  size = 24,
  alt,
}: PaymentMethodProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={sources[`./assets/${method}.svg`]}
      width={(size * 35) / 24}
      height={size}
      alt={alt ?? paymentMethodLabels[method]}
    />
  );
}
