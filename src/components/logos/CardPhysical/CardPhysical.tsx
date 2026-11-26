import gold from './assets/type-gold-diji-kart-false.png';
import privateCard from './assets/type-private-diji-kart-false.png';
import ayricalikli from './assets/type-ayricalikli-diji-kart-false.png';
import platinum from './assets/type-platinum-diji-kart-false.png';
import axess from './assets/type-axess-diji-kart-false.png';
import debit from './assets/type-debit-diji-kart-false.png';
import debitDiji from './assets/type-debit-diji-kart-true.png';
import styles from './CardPhysical.module.css';

export type CardPhysicalType = 'gold' | 'private' | 'ayricalikli' | 'platinum' | 'axess' | 'debit';

export type CardPhysicalProps = {
  className?: string;
  type: CardPhysicalType;
  dijiKart?: boolean;
};

const IMAGES: Record<CardPhysicalType, string> = {
  gold,
  private: privateCard,
  ayricalikli,
  platinum,
  axess,
  debit,
};

export default function CardPhysical({ className, type, dijiKart = false }: CardPhysicalProps) {
  // Diji kart yalnız debit tipinde mümkündür ve dikey (40x64) çizilir.
  const isDiji = type === 'debit' && dijiKart;
  const src = isDiji ? debitDiji : IMAGES[type];
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={[isDiji ? styles.diji : styles.standard, className].filter(Boolean).join(' ')}
    />
  );
}
