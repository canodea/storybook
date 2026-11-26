import odeaLogo from './assets/odea.svg';
import odeabankLogo from './assets/odeabank.svg';
import styles from './Logo.module.css';

const brands = {
  odea: { src: odeaLogo, width: 64, height: 24, label: 'Odea' },
  odeabank: { src: odeabankLogo, width: 118, height: 22, label: 'Odeabank' },
} as const;

export type LogoBrand = keyof typeof brands;

export type LogoProps = {
  className?: string;
  brand?: LogoBrand;
  /** Yükseklik (px). Verilmezse Figma yüksekliği (Odea 24, Odeabank 22) kullanılır. */
  height?: number;
};

export default function Logo({ className, brand = 'odea', height }: LogoProps) {
  const logo = brands[brand];
  const logoHeight = height ?? logo.height;

  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={logo.src}
      width={(logoHeight * logo.width) / logo.height}
      height={logoHeight}
      alt={logo.label}
    />
  );
}
