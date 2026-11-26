import type { KeyboardEvent } from 'react';
import { Icon } from '../../../foundations';
import Checkbox from '../../inputs/Checkbox';
import { useSyncedState } from '../../inputs/useSyncedState';
import styles from './AccountDropdown.module.css';

export type AccountDropdownState = 'default' | 'hover' | 'checkbox';

export type AccountDropdownProps = {
  className?: string;
  title?: string;
  info?: string;
  balanceLabel?: string;
  balance?: string;
  availableLabel?: string;
  available?: string;
  state?: AccountDropdownState;
  dropdown?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onClick?: () => void;
};

export default function AccountDropdown({
  className,
  title = 'Title',
  info = 'Sub text goes here',
  balanceLabel = 'Label',
  balance = '1.234,56 TL',
  availableLabel = 'Label',
  available = '1.234,56 TL',
  state = 'default',
  dropdown = true,
  checked: checkedProp = false,
  onCheckedChange,
  onClick,
}: AccountDropdownProps) {
  const [checked, setChecked] = useSyncedState(checkedProp);
  const isCheckbox = state === 'checkbox';
  const showCaret = dropdown && !isCheckbox;

  const handleCheckedChange = (value: boolean) => {
    setChecked(value);
    onCheckedChange?.(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onClick?.();
  };

  const rootClassName = [
    styles.root,
    state === 'hover' && styles.hover,
    isCheckbox || dropdown ? styles.interactive : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className={styles.top}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{title}</span>
          {isCheckbox ? (
            <Checkbox status={checked ? 'active' : 'base'} onChange={handleCheckedChange} />
          ) : (
            showCaret && (
              <Icon set="Arrows / Caret" name="Down" size={24} className={styles.caret} />
            )
          )}
        </div>
        <span className={styles.accountInfo}>{info}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoText}>{balanceLabel}</span>
        <span className={styles.balance}>{balance}</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoText}>{availableLabel}</span>
        <span className={styles.available}>{available}</span>
      </div>
    </>
  );

  if (isCheckbox) {
    return <label className={rootClassName}>{content}</label>;
  }

  return (
    <div
      className={rootClassName}
      role={dropdown ? 'button' : undefined}
      tabIndex={dropdown ? 0 : undefined}
      aria-haspopup={dropdown ? 'listbox' : undefined}
      onClick={onClick}
      onKeyDown={dropdown ? handleKeyDown : undefined}
    >
      {content}
    </div>
  );
}
