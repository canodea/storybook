import { useRef, useState } from 'react';
import { Icon } from '../../../foundations';
import Button from '../../buttons/Button';
import FlagAvatar, { type FlagAvatarCountry } from '../../avatars/FlagAvatar';
import { useSyncedState } from '../../inputs/useSyncedState';
import styles from './CurrencyConverter.module.css';

export type CurrencyConverterStatus = 'default' | 'tapped' | 'balance' | 'filled';

export type CurrencyConverterSide = 'top' | 'bottom';

export type CurrencyConverterSubmit = { from: string; to: string; amount: number };

export type CurrencyConverterProps = {
  className?: string;
  status?: CurrencyConverterStatus;
  helperText?: boolean;
  helperMessage?: string;
  button?: boolean;
  /** Buton etiketi; Figma'da "BUY/SELL", Türkçe senaryoda "AL/SAT". */
  buttonLabel?: string;
  /** Kur metni verilirse otomatik üretilen metin yerine bu gösterilir. */
  exchangeRate?: string;
  /** 1 USD = rate TL. */
  rate?: number;
  // üst para (TL)
  currencyCode2?: string;
  currencyName2?: string;
  balanceCaption2?: string;
  balanceAmount2?: string;
  country2?: FlagAvatarCountry;
  // alt para (USD)
  currencyCode1?: string;
  currencyName1?: string;
  balanceCaption1?: string;
  balanceAmount1?: string;
  country1?: FlagAvatarCountry;
  onSwap?: () => void;
  onCurrencyClick?: (side: CurrencyConverterSide) => void;
  onSubmit?: (values: CurrencyConverterSubmit) => void;
};

const amountFormat = new Intl.NumberFormat('tr-TR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const integerFormat = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });

const formatAmount = (value: number) => amountFormat.format(value);

const formatInteger = (value: number) => integerFormat.format(value);

const formatRate = (value: number) =>
  value.toLocaleString('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 });

/** Metin amountBlock genişliğini aşınca kademeli küçültme: 12+ karakter 20px, 16+ karakter 16px. */
const amountSize = (text: string) =>
  text.length > 16 ? 'sm' : text.length > 12 ? 'md' : undefined;

/** "1.234,56" → 1234.56 */
const parseAmount = (text: string) => Number(text.replace(/\./g, '').replace(',', '.')) || 0;

const centsOf = (value: number) => Math.round(value * 100);
const integerPart = (value: number) => Math.trunc(centsOf(value) / 100);
const decimalPart = (value: number) => String(centsOf(value) % 100).padStart(2, '0');
const roundCents = (value: number) => Math.round(value * 100) / 100;

/**
 * Yazılan metni tutara çevirir. Virgül ve nokta ondalık ayırıcıdır, en fazla 2
 * ondalık hane alınır; `decimals` yazılan hane sayısıdır (-1: ayırıcı yok).
 */
const parseInput = (text: string) => {
  const cleaned = text.replace(/[^\d.,]/g, '');
  const separator = Math.max(cleaned.lastIndexOf(','), cleaned.lastIndexOf('.'));
  // En fazla 12 tam hane: 327px karta sığan üst sınır.
  const whole = (separator < 0 ? cleaned : cleaned.slice(0, separator))
    .replace(/\D/g, '')
    .replace(/^0+(?=\d)/, '')
    .slice(0, 12);
  const fraction =
    separator < 0 ? '' : cleaned.slice(separator + 1).replace(/\D/g, '').slice(0, 2);
  return {
    value: Number(`${whole || '0'}.${fraction || '0'}`),
    decimals: separator < 0 ? -1 : fraction.length,
  };
};

const initialAmount = (status: CurrencyConverterStatus, balance: string) =>
  status === 'default' || status === 'tapped' ? 0 : Math.trunc(parseAmount(balance));

const initialDecimals = (status: CurrencyConverterStatus) =>
  status === 'default' || status === 'tapped' ? -1 : 0;

export default function CurrencyConverter({
  className,
  status: statusProp = 'default',
  helperText = false,
  helperMessage = 'Helper Text',
  button = false,
  buttonLabel = 'BUTTON',
  exchangeRate,
  rate = 1.2345,
  currencyCode2 = 'TL',
  currencyName2 = 'Turkish Lira',
  balanceCaption2 = 'All Balance',
  balanceAmount2 = '1.234,56',
  country2 = 'turkey',
  currencyCode1 = 'USD',
  currencyName1 = 'American Dollar',
  balanceCaption1 = 'All Balance',
  balanceAmount1 = '1.234,56',
  country1 = 'united-states',
  onSwap,
  onCurrencyClick,
  onSubmit,
}: CurrencyConverterProps) {
  const [status, setStatus] = useSyncedState(statusProp);
  // Prop başlangıç değeridir; kullanıcının yazdığı tutar sayı olarak iç durumda tutulur.
  const [amount, setAmount] = useSyncedState(initialAmount(statusProp, balanceAmount2));
  const [decimals, setDecimals] = useSyncedState(initialDecimals(statusProp));
  const [swapped, setSwapped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const top = swapped
    ? { country: country1, code: currencyCode1, name: currencyName1, caption: balanceCaption1, balance: balanceAmount1 }
    : { country: country2, code: currencyCode2, name: currencyName2, caption: balanceCaption2, balance: balanceAmount2 };
  const bottom = swapped
    ? { country: country2, code: currencyCode2, name: currencyName2, caption: balanceCaption2, balance: balanceAmount2 }
    : { country: country1, code: currencyCode1, name: currencyName1, caption: balanceCaption1, balance: balanceAmount1 };

  const topNumeric = status === 'default' ? parseAmount(top.balance) : amount;
  const bottomNumeric =
    status === 'default'
      ? parseAmount(bottom.balance)
      : top.code === bottom.code
        ? topNumeric
        : top.code === 'USD'
          ? topNumeric * rate
          : topNumeric / rate;

  const baseCode = top.code === 'USD' ? top.code : bottom.code === 'USD' ? bottom.code : top.code;
  const quoteCode = baseCode === top.code ? bottom.code : top.code;
  const rateText = exchangeRate ?? `1 ${baseCode} = ${formatRate(rate)} ${quoteCode}`;

  const focusInput = () => {
    setStatus('tapped');
    inputRef.current?.focus();
  };

  const handleInput = (value: string) => {
    const parsed = parseInput(value);
    setAmount(parsed.value);
    setDecimals(parsed.decimals);
    setStatus('tapped');
  };

  const handleBalance = () => {
    setAmount(Math.trunc(parseAmount(top.balance)));
    setDecimals(0);
    setStatus('balance');
  };

  const handleSwap = () => {
    // Yeni üst tutar eski alt tutardır; kuruş korunur, alt tutar kurla yeniden hesaplanır.
    if (status !== 'default' && amount > 0) {
      setAmount(roundCents(bottomNumeric));
      setDecimals(2);
    }
    setSwapped(!swapped);
    onSwap?.();
  };

  const showCaret = status === 'tapped' || status === 'balance';
  const typedDecimals = Math.max(decimals, 0);
  const inputValue =
    status === 'default'
      ? ''
      : `${integerPart(amount)}${decimals >= 0 ? `,${decimalPart(amount).slice(0, typedDecimals)}` : ''}`;

  const currencyBlock = (
    side: CurrencyConverterSide,
    data: typeof top,
  ) => (
    <div className={styles.block}>
      <button
        type="button"
        className={styles.currency}
        onClick={() => onCurrencyClick?.(side)}
      >
        <span className={styles.currencyCodeRow}>
          <FlagAvatar size="small" country={data.country} />
          <span className={styles.code}>{data.code}</span>
          <Icon set="Arrows / Caret" name="Down" size={16} className={styles.caret} />
        </span>
        <span className={styles.currencyName}>{data.name}</span>
      </button>

      {side === 'top' ? (
        <span
          className={styles.amountBlock}
          data-size={amountSize(
            status === 'default'
              ? top.balance
              : `${formatInteger(integerPart(amount))},${decimalPart(amount)}`,
          )}
        >
          <button
            type="button"
            className={styles.amount}
            onClick={focusInput}
          >
            {status === 'default' ? (
              top.balance
            ) : (
              <>
                <span>{formatInteger(integerPart(amount))}</span>
                {showCaret && <span className={styles.caretBar} />}
                <span className={styles.decimals}>
                  ,
                  <span className={styles.decimalsTyped}>
                    {decimalPart(amount).slice(0, typedDecimals)}
                  </span>
                  {'0'.repeat(2 - typedDecimals)}
                </span>
              </>
            )}
          </button>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            // 12 tam hane + virgül + 2 kuruş
            maxLength={15}
            aria-label="Tutar"
            value={inputValue}
            onChange={(event) => handleInput(event.target.value)}
            onFocus={() => setStatus('tapped')}
            onBlur={() => setStatus((current) => (current === 'tapped' ? 'filled' : current))}
          />
          <button type="button" className={styles.caption} onClick={handleBalance}>
            {data.caption}
          </button>
        </span>
      ) : (
        <span
          className={styles.amountBlock}
          data-size={amountSize(
            status === 'default' ? data.balance : formatAmount(bottomNumeric),
          )}
        >
          <span
            className={[styles.amount, status === 'tapped' ? styles.amountSecondary : '']
              .filter(Boolean)
              .join(' ')}
          >
            {status === 'default' ? data.balance : formatAmount(bottomNumeric)}
          </span>
          <span className={styles.captionStatic}>{data.caption}</span>
        </span>
      )}
    </div>
  );

  return (
    <div className={styles.wrap}>
      <div
        className={[styles.root, className].filter(Boolean).join(' ')}
        data-status={status}
        data-button={button}
      >
        {currencyBlock('top', top)}

        <div className={styles.middle}>
          <button
            type="button"
            className={styles.swap}
            aria-label="Para birimlerini değiştir"
            onClick={handleSwap}
          >
            <Icon
              set="Arrows / Double"
              name="Down Up"
              size={24}
              className={[styles.swapIcon, swapped ? styles.swapIconSwapped : '']
                .filter(Boolean)
                .join(' ')}
            />
          </button>
          <span className={styles.line} />
          <span className={styles.rate}>{rateText}</span>
          <span className={styles.lineEnd} />
        </div>

        {currencyBlock('bottom', bottom)}

        {button && (
          <Button
            className={styles.button}
            label={buttonLabel}
            priority="primary"
            size="large"
            fullWidth
            onClick={() =>
              onSubmit?.({ from: top.code, to: bottom.code, amount: topNumeric })
            }
          />
        )}
      </div>

      {helperText && <p className={styles.helper}>{helperMessage}</p>}
    </div>
  );
}
