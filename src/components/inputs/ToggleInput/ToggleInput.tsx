import Toggle from '../Toggle';
import { type IconSet } from '../../../foundations';
import IconAvatar from '../../avatars/IconAvatar';
import styles from './ToggleInput.module.css';

export type ToggleInputIcon = { set: IconSet; name: string };

export type ToggleInputProps = {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  multiLine?: boolean;
  label?: string;
  title?: string;
  info?: string;
  leadingAvatar?: ToggleInputIcon;
  onChange?: (checked: boolean) => void;
};

export default function ToggleInput({
  className,
  checked = false,
  disabled = false,
  multiLine = false,
  label = 'Text goes here',
  title = 'Label',
  info = 'Sub text goes here',
  leadingAvatar,
  onChange,
}: ToggleInputProps) {
  return (
    <label className={[styles.root, className].filter(Boolean).join(' ')}>
      {multiLine && leadingAvatar && (
        <span className={styles.avatar} aria-hidden="true">
          <IconAvatar size="xlarge" icon={leadingAvatar} />
        </span>
      )}

      {multiLine ? (
        <span className={styles.col}>
          <span className={styles.title}>{title}</span>
          <span className={styles.info}>{info}</span>
        </span>
      ) : (
        <span className={styles.label}>{label}</span>
      )}

      <Toggle checked={checked} disabled={disabled} onChange={onChange} />
    </label>
  );
}
