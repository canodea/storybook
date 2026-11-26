import eMailSvg from './assets/e-mail.svg';
import pushNtfSvg from './assets/push-ntf.svg';
import smsSvg from './assets/sms.svg';
import styles from './Otps.module.css';

export type OtpsProps = {
  className?: string;
  /** Figma: Channel. */
  channel?: 'push-ntf' | 'e-mail' | 'sms';
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

const media = {
  'push-ntf': pushNtfSvg,
  'e-mail': eMailSvg,
  sms: smsSvg,
} as const;

export default function Otps({ className, channel = 'push-ntf', size = 88 }: OtpsProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={media[channel]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
