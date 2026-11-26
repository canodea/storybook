import statusBarImage from './assets/default.svg';
import statusBarNoNotch from './assets/default-no-notch.svg';
import statusBarOnDark from './assets/on-dark.svg';
import styles from './StatusBar.module.css';

export type StatusBarProps = {
  className?: string;
  /**
   * `default`: açık zemin, siyah ikonlar ve çentik (Figma Status Bar).
   * `on-dark`: koyu zemin (Landing Title, Sheet View); beyaz ikonlar, çentik zemine karıştığı için çizilmez.
   * Koyu temada `default` otomatik olarak `on-dark` görünümüne geçer.
   */
  appearance?: 'default' | 'on-dark';
  /** `false`: açık görünümde çentik zemin rengiyle aynı olduğu için çizilmez (Figma Navigation Bar). */
  notch?: boolean;
};

export default function StatusBar({ className, appearance = 'default', notch = true }: StatusBarProps) {
  return (
    <div className={[styles.root, appearance === 'on-dark' && styles.onDark, className].filter(Boolean).join(' ')}>
      <img
        src={notch ? statusBarImage : statusBarNoNotch}
        alt=""
        aria-hidden="true"
        className={`${styles.image} ${styles.light}`}
      />
      <img src={statusBarOnDark} alt="" aria-hidden="true" className={`${styles.image} ${styles.dark}`} />
    </div>
  );
}
