import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Icon } from '../../../foundations';
import Checkbox from '../../inputs/Checkbox';
import RadioButton from '../../inputs/RadioButton';
import { useSyncedState } from '../../inputs/useSyncedState';
import DatePicker from '../../inputs/DatePicker';
import styles from './Dropdown.module.css';

export type DropdownStyle =
  | 'default'
  | 'disabled'
  | 'focused'
  | 'filled'
  | 'error'
  | 'opened'
  | 'default-opened'
  | 'radio-button-opened'
  | 'picker-opened'
  | 'picker-range-opened';

export type DropdownProps = {
  className?: string;
  fieldLabel?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  /** Önizleme; gerçek kullanımda tıklayınca açılır. */
  style?: DropdownStyle;
  fullWidth?: boolean;
  checkbox?: boolean;
  helperText?: boolean;
  helperMessage?: string;
  search?: boolean;
  searchPlaceholder?: string;
  selectedDate?: string;
  dateCaption?: string;
};

const DEFAULT_OPTIONS = ['Option One', 'Option Two', 'Option Three', 'Option Four'];

const OPENED_STYLES: DropdownStyle[] = [
  'opened',
  'default-opened',
  'radio-button-opened',
  'picker-opened',
  'picker-range-opened',
];

export default function Dropdown({
  className,
  fieldLabel = 'Select an option',
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  style = 'default',
  fullWidth = false,
  checkbox = false,
  helperText = false,
  helperMessage = 'Helper Text',
  search = false,
  searchPlaceholder = 'Search',
  selectedDate = '8th November 2021',
  dateCaption = 'Selected date',
}: DropdownProps) {
  const [selected, setSelected] = useSyncedState(value ?? '');
  const [open, setOpen] = useState(OPENED_STYLES.includes(style));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const disabled = style === 'disabled';
  const isPicker = style === 'picker-opened' || style === 'picker-range-opened';
  const isRadio = style === 'radio-button-opened';
  const notched = style === 'filled' || isPicker;

  const legendText = isPicker ? dateCaption : fieldLabel;
  const triggerText = isPicker ? selectedDate : selected || fieldLabel;

  const choose = (option: string) => {
    setSelected(option);
    onChange?.(option);
    setOpen(false);
  };

  // Klavyeyle odaklanan satır Enter/Space ile de seçilebilir (odak halkası tek başına tuzağa dönüşmesin).
  const activate = (event: ReactKeyboardEvent<HTMLDivElement>, run: () => void) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      run();
    }
  };

  const toggle = () => {
    if (disabled) return;
    setOpen((current) => !current);
  };

  const trigger = (
    <button
      type="button"
      className={styles.trigger}
      aria-haspopup="listbox"
      aria-expanded={open}
      disabled={disabled}
      onClick={toggle}
    >
      <span className={styles.value}>{triggerText}</span>
      {isPicker ? (
        <Icon set="Time" name="CalendarBlank" size={24} className={styles.caret} />
      ) : (
        <Icon set="Arrows / Caret" name={open ? 'Up' : 'Down'} size={24} className={styles.caret} />
      )}
    </button>
  );

  const menu = open && !isPicker && (
    <>
      <div className={styles.divider} />
      {search && (
        <>
          <div className={styles.searchRow}>
            <Icon set="System" name="MagnifyingGlass" size={24} className={styles.searchIcon} />
            <span className={styles.searchPlaceholder}>{searchPlaceholder}</span>
          </div>
          <div className={styles.divider} />
        </>
      )}
      <div role="listbox" className={styles.options}>
        {options.map((option) => {
          const selectedOption = option === selected;
          if (isRadio) {
            // value tek string olduğundan çoklu seçim görünümü seçili tek öğeyi işaretler.
            return (
              <div
                key={option}
                role="option"
                tabIndex={0}
                aria-selected={selectedOption}
                className={[styles.optionRadio, selectedOption && styles.optionRadioSelected]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => choose(option)}
                onKeyDown={(event) => activate(event, () => choose(option))}
              >
                {checkbox ? (
                  <Checkbox
                    status={selectedOption ? 'active' : 'base'}
                    onChange={() => choose(option)}
                  />
                ) : (
                  <RadioButton
                    controlled
                    checked={selectedOption}
                    onChange={() => choose(option)}
                  />
                )}
                <span className={styles.optionRadioLabel}>{option}</span>
              </div>
            );
          }
          return (
            <div
              key={option}
              role="option"
              tabIndex={0}
              aria-selected={selectedOption}
              className={[styles.option, selectedOption && styles.optionSelected]
                .filter(Boolean)
                .join(' ')}
              onClick={() => choose(option)}
              onKeyDown={(event) => activate(event, () => choose(option))}
            >
              {option}
            </div>
          );
        })}
      </div>
    </>
  );

  const pickerArea = open && isPicker && (
    <>
      <div className={styles.divider} />
      <DatePicker type={style === 'picker-range-opened' ? 'range' : 'default'} />
    </>
  );

  return (
    <div
      ref={rootRef}
      className={[styles.root, fullWidth && styles.rootFull, className].filter(Boolean).join(' ')}
      data-style={style}
    >
      {notched ? (
        <fieldset className={styles.field}>
          <legend className={styles.legend}>{legendText}</legend>
          {trigger}
          {menu}
          {pickerArea}
        </fieldset>
      ) : (
        <div className={styles.field}>
          {trigger}
          {menu}
          {pickerArea}
        </div>
      )}
      {helperText && <span className={styles.helper}>{helperMessage}</span>}
    </div>
  );
}
