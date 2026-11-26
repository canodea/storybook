import errorSvg from './assets/error.svg';
import informationSvg from './assets/information.svg';
import successSvg from './assets/success.svg';
import timeOutSvg from './assets/time-out.svg';
import warningSvg from './assets/warning.svg';
import styles from './WarningSigns.module.css';

export type WarningSignsProps = {
  className?: string;
  /** Figma: Type. */
  type?: 'warning' | 'success' | 'information' | 'time-out' | 'error';
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

const media = {
  warning: warningSvg,
  success: successSvg,
  information: informationSvg,
  'time-out': timeOutSvg,
  error: errorSvg,
} as const;

export default function WarningSigns({ className, type = 'warning', size = 88 }: WarningSignsProps) {
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
