import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type UIEvent } from 'react';
import { Icon } from '../../../foundations';
import DateNumber, { type DateNumberState } from '../DateNumber';
import { useSyncedState } from '../useSyncedState';
import styles from './DatePicker.module.css';

export type DatePickerType = 'default' | 'range' | 'months';

type GridType = Exclude<DatePickerType, 'months'>;

export type DatePickerProps = {
  className?: string;
  type?: DatePickerType;
  value?: Date;
  rangeEnd?: Date;
  today?: Date;
  defaultMonth?: Date;
  onChange?: (start: Date, end?: Date) => void;
  onTypeChange?: (type: DatePickerType) => void;
};

const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTHS_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const DEFAULT_MONTH = new Date(2021, 10, 1);
const DEFAULT_VALUE = new Date(2021, 10, 14);
const DEFAULT_RANGE_END = new Date(2021, 10, 23);
const DEFAULT_TODAY = new Date(2021, 10, 5);

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

// Saat farkı seçim/aralık karşılaştırmalarını bozmasın diye gün başına indirger.
const dayValue = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const sameDay = (a: Date, b: Date) => dayValue(a) === dayValue(b);

const monthLabel = (date: Date) => `${MONTHS_EN[date.getMonth()]} ${date.getFullYear()}`;

const dayLabel = (date: Date) => `${date.getDate()} ${MONTHS_TR[date.getMonth()]} ${date.getFullYear()}`;

// Date prop'ları her çizimde yeni nesne olabilir; yalnız zaman değeri değişince iç durumu güncelle.
function useSyncedDate<T extends Date | undefined>(value: T) {
  const [state, setState] = useState<T>(value);
  const key = value ? value.getTime() : undefined;
  useEffect(() => setState(value), [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return [state, setState] as const;
}

const ROW_HEIGHT = 24;
const MONTH_COPIES = 5;
const CENTER_COPY = (MONTH_COPIES - 1) / 2;
const YEAR_MIN = 1950;
const YEAR_MAX = 2100;
const YEARS = Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, index) => YEAR_MIN + index);
const WHEEL_OPACITY = [1, 1, 0.8, 0.5];

const clampYearRow = (year: number) => Math.min(Math.max(year - YEAR_MIN, 0), YEARS.length - 1);

const wheelOpacity = (distance: number) => WHEEL_OPACITY[distance] ?? 0.3;

const wheelOptionClass = (index: number, selectedIndex: number) =>
  [
    styles.wheelOption,
    index === selectedIndex && styles.wheelOptionSelected,
    index < selectedIndex && styles.wheelOptionAbove,
    index > selectedIndex && styles.wheelOptionBelow,
  ]
    .filter(Boolean)
    .join(' ');

export default function DatePicker({
  className,
  type = 'default',
  value = DEFAULT_VALUE,
  rangeEnd = DEFAULT_RANGE_END,
  today = DEFAULT_TODAY,
  defaultMonth = DEFAULT_MONTH,
  onChange,
  onTypeChange,
}: DatePickerProps) {
  const [view, setView] = useSyncedState(type);
  const [gridType, setGridType] = useState<GridType>(type === 'months' ? 'default' : type);
  const [month, setMonth] = useSyncedDate(startOfMonth(defaultMonth));
  const [selected, setSelected] = useSyncedDate(value);
  const [end, setEnd] = useSyncedDate<Date | undefined>(rangeEnd);
  const [monthRow, setMonthRow] = useState(CENTER_COPY * 12 + month.getMonth());
  const [yearRow, setYearRow] = useState(clampYearRow(month.getFullYear()));
  const monthsRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const monthFrame = useRef<number>();
  const yearFrame = useRef<number>();
  const monthSnapTimer = useRef<number>();

  // Takvime dönüşte ve defaultMonth değişince tekerlekleri seçili ay/yıla animasyonsuz getir.
  useLayoutEffect(() => {
    if (view !== 'months') return;
    const monthIndex = month.getMonth();
    const monthPosition = CENTER_COPY * 12 + monthIndex;
    const yearPosition = clampYearRow(month.getFullYear());
    setMonthRow(monthPosition);
    setYearRow(yearPosition);
    if (monthsRef.current) monthsRef.current.scrollTop = monthPosition * ROW_HEIGHT;
    if (yearsRef.current) yearsRef.current.scrollTop = yearPosition * ROW_HEIGHT;
  }, [month, view]);

  const handleMonthsScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    if (monthFrame.current !== undefined) return;
    monthFrame.current = requestAnimationFrame(() => {
      monthFrame.current = undefined;
      setMonthRow(Math.round(element.scrollTop / ROW_HEIGHT));
      window.clearTimeout(monthSnapTimer.current);
      monthSnapTimer.current = window.setTimeout(() => {
        const current = Math.round(element.scrollTop / ROW_HEIGHT);
        // İlk/son kopyada durulduysa aynı ayın orta kopyasına atla.
        if (current < 12 || current >= 12 * (MONTH_COPIES - 1)) {
          element.scrollTop = (CENTER_COPY * 12 + (((current % 12) + 12) % 12)) * ROW_HEIGHT;
        }
      }, 150);
    });
  };

  const handleYearsScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    if (yearFrame.current !== undefined) return;
    yearFrame.current = requestAnimationFrame(() => {
      yearFrame.current = undefined;
      const index = Math.round(element.scrollTop / ROW_HEIGHT);
      setYearRow(Math.min(Math.max(index, 0), YEARS.length - 1));
    });
  };

  const handleWheelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    event.currentTarget.scrollBy({
      top: event.key === 'ArrowDown' ? ROW_HEIGHT : -ROW_HEIGHT,
      behavior: 'smooth',
    });
  };

  if (view === 'months') {
    const label = monthLabel(new Date(YEAR_MIN + yearRow, monthRow % 12, 1));

    return (
      <div className={[styles.rootMonths, className].filter(Boolean).join(' ')}>
        <button
          type="button"
          className={styles.monthsHeader}
          aria-label={`${label} — takvime dön`}
          onClick={() => {
            setMonth(new Date(YEAR_MIN + yearRow, monthRow % 12, 1));
            setView(gridType);
            onTypeChange?.(gridType);
          }}
        >
          <span className={styles.monthLabel}>{label}</span>
          <Icon set="Arrows / Caret" name="Down" size={24} className={styles.monthsCaret} />
        </button>
        <div className={styles.wheel}>
          <div className={styles.wheelLines} aria-hidden="true" />
          <div className={styles.wheelColumns}>
            <div
              ref={monthsRef}
              className={styles.wheelColumn}
              role="listbox"
              aria-label="Ay"
              tabIndex={0}
              onScroll={handleMonthsScroll}
              onKeyDown={handleWheelKeyDown}
            >
              {Array.from({ length: 12 * MONTH_COPIES }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  role="option"
                  aria-selected={index === monthRow}
                  className={wheelOptionClass(index, monthRow)}
                  style={{ opacity: wheelOpacity(Math.abs(index - monthRow)) }}
                  onClick={() => monthsRef.current?.scrollTo({ top: index * ROW_HEIGHT, behavior: 'smooth' })}
                >
                  {MONTHS_EN[index % 12]}
                </button>
              ))}
            </div>
            <div
              ref={yearsRef}
              className={[styles.wheelColumn, styles.wheelColumnYears].filter(Boolean).join(' ')}
              role="listbox"
              aria-label="Yıl"
              tabIndex={0}
              onScroll={handleYearsScroll}
              onKeyDown={handleWheelKeyDown}
            >
              {YEARS.map((year, index) => (
                <button
                  key={year}
                  type="button"
                  role="option"
                  aria-selected={index === yearRow}
                  className={wheelOptionClass(index, yearRow)}
                  style={{ opacity: wheelOpacity(Math.abs(index - yearRow)) }}
                  onClick={() => yearsRef.current?.scrollTo({ top: index * ROW_HEIGHT, behavior: 'smooth' })}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7; // Pazartesi = 0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(year, monthIndex, index - firstWeekday + 1);
    return { date, inMonth: date.getMonth() === monthIndex };
  });

  const rows = Array.from({ length: cellCount / 7 }, (_, rowIndex) =>
    cells.slice(rowIndex * 7, rowIndex * 7 + 7),
  );

  const rangeBounds =
    view === 'range' && end
      ? dayValue(end) < dayValue(selected)
        ? [end, selected]
        : [selected, end]
      : undefined;

  const handleDayClick = (date: Date) => {
    if (view === 'range') {
      if (!end) {
        if (dayValue(date) < dayValue(selected)) {
          setSelected(date);
          setEnd(selected);
          onChange?.(date, selected);
        } else {
          setEnd(date);
          onChange?.(selected, date);
        }
        return;
      }
      setSelected(date);
      setEnd(undefined);
      onChange?.(date);
      return;
    }

    setSelected(date);
    onChange?.(date);
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.monthGroup}
          aria-label={`${monthLabel(month)} — ay seçimi`}
          onClick={() => {
            setGridType(view);
            setView('months');
            onTypeChange?.('months');
          }}
        >
          <span className={styles.monthLabel}>{monthLabel(month)}</span>
          <Icon set="Arrows / Caret" name="Right" size={24} className={styles.monthCaret} />
        </button>
        <div className={styles.navGroup}>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Önceki ay"
            onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}
          >
            <Icon set="Arrows / Caret" name="Left" size={24} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Sonraki ay"
            onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}
          >
            <Icon set="Arrows / Caret" name="Right" size={24} />
          </button>
        </div>
      </div>

      <div className={styles.weekRow}>
        {WEEKDAYS.map((day) => (
          <span key={day} className={styles.weekDay}>
            {day}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {rows.map((row) => (
          <div key={dayValue(row[0].date)} className={styles.dayRow}>
            {row.map(({ date, inMonth }) => {
              const isStart = inMonth && sameDay(date, selected);
              const isEnd = view === 'range' && inMonth && end !== undefined && sameDay(date, end);
              const isSelected = isStart || isEnd;
              const inRange =
                rangeBounds !== undefined &&
                inMonth &&
                !isSelected &&
                dayValue(date) > dayValue(rangeBounds[0]) &&
                dayValue(date) < dayValue(rangeBounds[1]);
              // Şerit uçlardaki dairelerin arkasından (yarım hücre) başlar ve biter.
              const hasBand = rangeBounds !== undefined && inMonth && dayValue(rangeBounds[0]) !== dayValue(rangeBounds[1]);
              const bandStart = hasBand && sameDay(date, rangeBounds![0]);
              const bandEnd = hasBand && sameDay(date, rangeBounds![1]);

              const state: DateNumberState = !inMonth
                ? 'disabled'
                : isSelected
                  ? 'selected'
                  : sameDay(date, today)
                    ? 'today'
                    : 'active';

              return (
                <span
                  key={dayValue(date)}
                  className={[styles.cell, inRange && styles.rangeCell, bandStart && styles.rangeStart, bandEnd && styles.rangeEnd].filter(Boolean).join(' ')}
                >
                  <DateNumber
                    state={state}
                    aria-label={dayLabel(date)}
                    aria-pressed={isSelected}
                    onClick={() => handleDayClick(date)}
                  >
                    {date.getDate()}
                  </DateNumber>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
