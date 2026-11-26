import atmWBgSvg from './assets/atm-w-bg.svg';
import atmSvg from './assets/atm.svg';
import bankWBgSvg from './assets/bank-w-bg.svg';
import bankSvg from './assets/bank.svg';
import digitalBankingSvg from './assets/digital-banking.svg';
import styles from './BankAssets.module.css';

export type BankAssetsProps = {
  className?: string;
  /** Figma: Type. */
  type?: 'bank' | 'digital-banking' | 'bank-w-bg' | 'atm-w-bg' | 'atm';
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

const media = {
  bank: bankSvg,
  'digital-banking': digitalBankingSvg,
  'bank-w-bg': bankWBgSvg,
  'atm-w-bg': atmWBgSvg,
  atm: atmSvg,
} as const;

export default function BankAssets({ className, type = 'bank', size = 320 }: BankAssetsProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={media[type]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
