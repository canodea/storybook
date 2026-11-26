import { Icon, type IconSet } from '../../../foundations';
import styles from './Button.module.css';

export type ButtonIcon = { set: IconSet; name: string };
export type ButtonPriority = 'primary' | 'secondary';
export type ButtonState = 'enabled' | 'disabled' | 'tapped' | 'hover' | 'focused';
export type ButtonSize = 'large' | 'small';
export type ButtonContent = 'text' | 'icon-text' | 'icon-only';

export type ButtonProps = {
  className?: string;
  label?: string;
  priority?: ButtonPriority;
  state?: ButtonState;
  size?: ButtonSize;
  content?: ButtonContent;
  leadingIcon?: ButtonIcon | null;
  icon?: ButtonIcon | null;
  onClick?: () => void;
  'aria-label'?: string;
  fullWidth?: boolean;
};

export default function Button({
  className,
  label = 'BUTTON',
  priority = 'primary',
  state = 'enabled',
  size = 'large',
  content = 'text',
  leadingIcon = { set: 'Maps', name: 'House' },
  icon = { set: 'Math', name: 'Plus' },
  onClick,
  'aria-label': ariaLabel,
  fullWidth,
}: ButtonProps) {
  const iconOnly = content === 'icon-only';
  const leading = leadingIcon === null ? null : leadingIcon;
  const standalone = icon === null ? null : icon;

  return (
    <button
      type="button"
      className={[styles.root, fullWidth ? styles.fullWidth : '', className]
        .filter(Boolean)
        .join(' ')}
      data-priority={priority}
      data-state={state}
      data-size={size}
      data-content={content}
      disabled={state === 'disabled'}
      aria-label={iconOnly ? ariaLabel : undefined}
      onClick={onClick}
    >
      {iconOnly ? (
        standalone && <Icon {...standalone} size={24} className={styles.iconOnly} />
      ) : (
        <>
          {content === 'icon-text' && leading && (
            <Icon
              {...leading}
              size={size === 'large' ? 24 : 20}
              className={styles.iconLeading}
            />
          )}
          <span className={styles.label}>{label}</span>
        </>
      )}
    </button>
  );
}
