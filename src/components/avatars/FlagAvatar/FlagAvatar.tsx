import turkeyFlag from './assets/turkey.svg';
import unitedStatesFlag from './assets/united-states.svg';
import styles from './FlagAvatar.module.css';

export type FlagAvatarSize = 'large' | 'medium' | 'base' | 'small';
export type FlagAvatarCountry = 'turkey' | 'united-states';

export type FlagAvatarProps = {
  className?: string;
  size?: FlagAvatarSize;
  country: FlagAvatarCountry;
};

const SIZE_PX: Record<FlagAvatarSize, number> = { large: 40, medium: 32, base: 24, small: 16 };

const FLAGS: Record<FlagAvatarCountry, string> = {
  turkey: turkeyFlag,
  'united-states': unitedStatesFlag,
};

export default function FlagAvatar({ className, size = 'base', country }: FlagAvatarProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <img
        src={FLAGS[country]}
        alt=""
        aria-hidden="true"
        width={SIZE_PX[size]}
        height={SIZE_PX[size]}
        className={styles.image}
      />
    </div>
  );
}
