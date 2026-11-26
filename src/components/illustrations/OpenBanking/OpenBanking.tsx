import openBankingSvg from './assets/open-banking.svg';
import styles from './OpenBanking.module.css';

export type OpenBankingProps = {
  className?: string;
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

export default function OpenBanking({ className, size = 240 }: OpenBankingProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={openBankingSvg}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
