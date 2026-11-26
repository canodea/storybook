import styles from './QuickFilterTags.module.css';

export type QuickFilterTagsProps = {
  className?: string;
  filterLabel?: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function QuickFilterTags({
  className,
  filterLabel = 'LABEL',
  selected = false,
  onClick,
}: QuickFilterTagsProps) {
  return (
    <button
      type="button"
      className={[styles.root, className].filter(Boolean).join(' ')}
      aria-pressed={selected}
      onClick={onClick}
    >
      {filterLabel}
    </button>
  );
}
