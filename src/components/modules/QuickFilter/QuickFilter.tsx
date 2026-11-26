import { useSyncedState } from '../../inputs/useSyncedState';
import QuickFilterTags from '../QuickFilterTags';
import styles from './QuickFilter.module.css';

export type QuickFilterProps = {
  className?: string;
  tags?: string[];
  /** Seçili etiket; değer (etiket metni) ya da indeks olarak verilebilir. */
  selected?: string | number;
  /** Seçim değişince seçili indeksi bildirir. */
  onChange?: (index: number) => void;
};

function toIndex(tags: string[], selected: string | number): number {
  if (typeof selected === 'number') return selected;
  const i = tags.indexOf(selected);
  return i >= 0 ? i : 0;
}

export default function QuickFilter({
  className,
  tags = ['TÜMÜ', 'HİSSE', 'FON', 'DÖVİZ', 'ALTIN'],
  selected = 0,
  onChange,
}: QuickFilterProps) {
  const [index, setIndex] = useSyncedState(toIndex(tags, selected));

  const handleClick = (i: number) => {
    setIndex(i);
    onChange?.(i);
  };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {tags.map((tag, i) => (
        <QuickFilterTags
          key={tag}
          filterLabel={tag}
          selected={i === index}
          onClick={() => handleClick(i)}
        />
      ))}
    </div>
  );
}
