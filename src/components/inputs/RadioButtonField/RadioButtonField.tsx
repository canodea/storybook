import { useSyncedState } from '../useSyncedState';
import { useId } from 'react';
import RadioButton from '../RadioButton';
import styles from './RadioButtonField.module.css';

export type RadioButtonFieldLayout = 'single' | 'vertical-options' | 'horizontal-options';

export type RadioButtonFieldProps = {
  className?: string;
  layout?: RadioButtonFieldLayout;
  checked?: boolean;
  disabled?: boolean;
  multiLine?: boolean;
  fieldLabel?: string;
  title?: string;
  info?: string;
  optionTop?: string;
  optionBottom?: string;
  /** Multi Line + Vertical Options: üst/alt seçeneğin açıklama satırı. */
  optionTopInfo?: string;
  optionBottomInfo?: string;
  optionLeft?: string;
  optionRight?: string;
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
};

export default function RadioButtonField({
  className,
  layout = 'single',
  checked: checkedProp = false,
  disabled = false,
  multiLine = false,
  fieldLabel = 'Text goes here',
  title = 'Label',
  info = 'Sub text goes here',
  optionTop = 'Text goes here',
  optionBottom = 'Text goes here',
  optionTopInfo = 'Sub text goes here',
  optionBottomInfo = 'Sub text goes here',
  optionLeft = 'Text',
  optionRight = 'Text',
  value: valueProp = '',
  name: nameProp,
  onChange,
}: RadioButtonFieldProps) {
  const labelId = useId();
  // Her grup kendi adını alır; aynı sayfadaki gruplar birbirinin seçimini bozmaz.
  const name = nameProp ?? `radio-${labelId}`;
  const [value, setValue] = useSyncedState(valueProp);
  // Tek seçenekte tıklama da iç durumu günceller; radio olduğu için tekrar tık seçimi kaldırmaz.
  const [checked, setChecked] = useSyncedState(checkedProp);

  if (layout === 'single') {
    return (
      <div className={[styles.root, className].filter(Boolean).join(' ')}>
        <label className={[styles.singleRow, multiLine ? styles.multiLine : ''].join(' ')}>
          <RadioButton
              controlled
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={(c) => {
              setChecked(c);
              onChange?.(c ? 'checked' : '');
            }}
          />
          {multiLine ? (
            <span className={styles.col}>
              <span className={styles.title}>{title}</span>
              <span className={styles.info}>{info}</span>
            </span>
          ) : (
            <span className={styles.label}>{fieldLabel}</span>
          )}
        </label>
      </div>
    );
  }

  const options =
    layout === 'vertical-options'
      ? [
          { key: 'top', text: optionTop, info: optionTopInfo },
          { key: 'bottom', text: optionBottom, info: optionBottomInfo },
        ]
      : [
          { key: 'left', text: optionLeft, info: '' },
          { key: 'right', text: optionRight, info: '' },
        ];

  const vertical = layout === 'vertical-options';
  // Çok satır yalnız dikey seçeneklerde: her seçenek başlık + açıklama taşır.
  const optionMultiLine = vertical && multiLine;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} role="radiogroup" aria-labelledby={labelId}>
      <span id={labelId} className={[styles.groupLabel, vertical ? styles.srOnly : ''].join(' ')}>
        {fieldLabel}
      </span>
      <div className={[vertical ? styles.vertical : styles.horizontal, optionMultiLine ? styles.verticalMulti : ''].join(' ')}>
        {options.map((opt) => (
          <label key={opt.key} className={styles.optionRow}>
            <RadioButton
              controlled
              checked={value === opt.key}
              disabled={disabled}
              name={name}
              value={opt.key}
              onChange={() => {
                setValue(opt.key);
                onChange?.(opt.key);
              }}
            />
            {optionMultiLine ? (
              <span className={styles.col}>
                <span className={styles.title}>{opt.text}</span>
                <span className={styles.info}>{opt.info}</span>
              </span>
            ) : (
              <span className={styles.optionLabel}>{opt.text}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
