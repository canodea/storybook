import Checkbox from '../../inputs/Checkbox';
import { useSyncedState } from '../../inputs/useSyncedState';
import styles from './ContractCheck.module.css';

export type ContractCheckProps = {
  className?: string;
  disclosureTitle: string;
  consentDescription?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function ContractCheck({
  className,
  disclosureTitle,
  consentDescription,
  checked: checkedProp = true,
  onChange,
}: ContractCheckProps) {
  const [checked, setChecked] = useSyncedState(checkedProp);

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.topRow}>
        <span className={styles.title}>{disclosureTitle}</span>
        <Checkbox
          status={checked ? 'active' : 'base'}
          onChange={(value) => {
            setChecked(value);
            onChange?.(value);
          }}
        />
      </div>
      {consentDescription && <span className={styles.description}>{consentDescription}</span>}
    </div>
  );
}
