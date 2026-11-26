import { Icon, type IconSet } from '../../../foundations';
import styles from './CurrencyAvatar.module.css';

export type CurrencyAvatarSize = 'medium' | 'small';
export type CurrencyAvatarIcon = { set: IconSet; name: string };

export type CurrencyAvatarProps = {
  className?: string;
  size?: CurrencyAvatarSize;
  icon?: CurrencyAvatarIcon;
};

const SIZE_PX: Record<CurrencyAvatarSize, number> = { medium: 24, small: 16 };
// Figma: para birimi ikonu avatarı tamamen kaplar (zemin surface/contrast, işaret icon/color/default).
const ICON_PX: Record<CurrencyAvatarSize, number> = { medium: 24, small: 16 };

export default function CurrencyAvatar({ className, size = 'medium', icon = { set: 'Currency', name: 'Try' } }: CurrencyAvatarProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ width: SIZE_PX[size], height: SIZE_PX[size] }}
    >
      <Icon {...icon} size={ICON_PX[size]} className={styles.icon} />
    </div>
  );
}
