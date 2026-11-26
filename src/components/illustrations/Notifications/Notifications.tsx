import colorAltinStateDisabledSvg from './assets/color-altin-state-disabled.svg';
import colorAltinStateEnabledSvg from './assets/color-altin-state-enabled.svg';
import colorGriStateDisabledSvg from './assets/color-gri-state-disabled.svg';
import colorGriStateEnabledSvg from './assets/color-gri-state-enabled.svg';
import styles from './Notifications.module.css';

export type NotificationsProps = {
  className?: string;
  /** Figma: Color. */
  color?: 'altin' | 'gri';
  /** Figma: State. */
  state?: 'enabled' | 'disabled';
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

const media = {
  altin: {
    enabled: colorAltinStateEnabledSvg,
    disabled: colorAltinStateDisabledSvg,
  },
  gri: {
    enabled: colorGriStateEnabledSvg,
    disabled: colorGriStateDisabledSvg,
  },
} as const;

export default function Notifications({ className, color = 'altin', state = 'enabled', size = 288 }: NotificationsProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={media[color][state]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
