import { useSyncedState } from '../../inputs/useSyncedState';
import styles from './Tabs.module.css';

export type TabsSelected = 1 | 2 | 3 | 4;

export type TabsProps = {
  className?: string;
  labels?: string[];
  selected?: TabsSelected;
  onChange?: (selected: TabsSelected) => void;
};

const DEFAULT_LABELS = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];

export default function Tabs({ className, labels = DEFAULT_LABELS, selected = 1, onChange }: TabsProps) {
  const [current, setCurrent] = useSyncedState(selected);
  const visible = labels.slice(0, 4);
  const count = visible.length;

  const select = (index: number) => {
    const next = (index + 1) as TabsSelected;
    setCurrent(next);
    onChange?.(next);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!count) return;
    const index = current - 1;
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (index + 1) % count;
    else if (event.key === 'ArrowLeft') next = (index + count - 1) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    if (next !== undefined) {
      event.preventDefault();
      select(next);
    }
  };

  return (
    <div role="tablist" className={[styles.root, className].filter(Boolean).join(' ')} onKeyDown={onKeyDown}>
      {visible.map((label, index) => {
        const isSelected = current === index + 1;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            className={[styles.tab, isSelected && styles.selected].filter(Boolean).join(' ')}
            onClick={(event) => {
              event.currentTarget.scrollIntoView({ inline: 'nearest', block: 'nearest' });
              select(index);
            }}
          >
            <span className={styles.label}>{label}</span>
            <span className={styles.indicator} />
          </button>
        );
      })}
    </div>
  );
}
