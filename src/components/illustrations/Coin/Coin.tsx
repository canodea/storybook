import colorGoldAmountSingleSvg from './assets/color-gold-amount-single.svg';
import colorGoldAmountStackSvg from './assets/color-gold-amount-stack.svg';
import colorWhiteAmountSingleSvg from './assets/color-white-amount-single.svg';
import colorWhiteAmountStackSvg from './assets/color-white-amount-stack.svg';
import styles from './Coin.module.css';

export type CoinProps = {
  className?: string;
  /** Figma: Color. */
  color?: 'gold' | 'white';
  /** Figma: Amount. */
  amount?: 'single' | 'stack';
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

const media = {
  gold: {
    single: colorGoldAmountSingleSvg,
    stack: colorGoldAmountStackSvg,
  },
  white: {
    single: colorWhiteAmountSingleSvg,
    stack: colorWhiteAmountStackSvg,
  },
} as const;

export default function Coin({ className, color = 'gold', amount = 'single', size = 80 }: CoinProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={media[color][amount]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
