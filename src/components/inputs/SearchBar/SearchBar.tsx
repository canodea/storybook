import { useRef, useState } from 'react';
import { Icon, type IconSet } from '../../../foundations';
import { useSyncedState } from '../useSyncedState';
import styles from './SearchBar.module.css';

export type SearchBarType = 'default' | 'focused' | 'filled';
export type SearchBarIcon = { set: IconSet; name: string };

export type SearchBarProps = {
  className?: string;
  placeholder?: string;
  searchQuery?: string;
  showClear?: boolean;
  searchIcon?: SearchBarIcon;
  clearIcon?: SearchBarIcon;
  type?: SearchBarType;
  onChange?: (value: string) => void;
  onClear?: () => void;
};

export default function SearchBar({
  className,
  placeholder = 'Search...',
  searchQuery = '',
  showClear = true,
  searchIcon = { set: 'System', name: 'MagnifyingGlass' },
  clearIcon = { set: 'System', name: 'XCircle' },
  type = 'default',
  onChange,
  onClear,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [mode, setMode] = useSyncedState<SearchBarType>(type);
  const effective: SearchBarType = focused ? 'focused' : mode;
  // Type=default pasif ve boş görünüm demektir; değer yalnız filled/focused'ta gösterilir.
  const value = effective === 'default' ? '' : searchQuery;
  const showClearButton = showClear && value.length > 0;

  const handleBlur = () => {
    setFocused(false);
    setMode(value ? 'filled' : 'default');
  };

  const handleClear = () => {
    onChange?.('');
    onClear?.();
    setMode('filled');
    inputRef.current?.focus();
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.field}>
        <Icon {...searchIcon} size={24} className={styles.searchIcon} />
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        />
        {showClearButton && (
          <button type="button" className={styles.clear} aria-label="Temizle" onClick={handleClear}>
            <Icon {...clearIcon} size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
