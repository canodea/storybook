import { Icon, type IconSet } from '../../../foundations';
import styles from './IconAvatar.module.css';

export type IconAvatarSize = 'small' | 'base' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
export type IconAvatarIcon = { set: IconSet; name: string };

export type IconAvatarProps = {
  className?: string;
  size?: IconAvatarSize;
  icon?: IconAvatarIcon;
};

const SIZE_PX: Record<IconAvatarSize, number> = {
  small: 16,
  base: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
  xxlarge: 56,
};

const ICON_PX: Record<IconAvatarSize, number> = {
  small: 12,
  base: 16,
  medium: 24,
  large: 24,
  xlarge: 29,
  xxlarge: 34,
};

export default function IconAvatar({ className, size = 'base', icon = { set: 'Design', name: 'Cube' } }: IconAvatarProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ width: SIZE_PX[size], height: SIZE_PX[size] }}
    >
      <Icon {...icon} size={ICON_PX[size]} className={styles.icon} />
    </div>
  );
}
