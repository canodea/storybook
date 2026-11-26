import { useSyncedState } from '../../inputs/useSyncedState';
import HomeIndicator from '../../shared/HomeIndicator';
import TabLink, { type TabLinkIcon } from '../TabLink';
import styles from './BottomBar.module.css';

export type BottomBarItem = {
  icon: TabLinkIcon;
  label: string;
};

export type BottomBarProps = {
  className?: string;
  items?: BottomBarItem[];
  /** 0 tabanlı seçili öğe. */
  activeIndex?: number;
  onChange?: (index: number) => void;
};

const DEFAULT_ITEMS: BottomBarItem[] = [
  { icon: { set: 'Maps', name: 'HouseSimple' }, label: 'Home' },
  { icon: { set: 'Math', name: 'Bank' }, label: 'Banking' },
  { icon: { set: 'Math', name: 'ChartBarSimple' }, label: 'Investments' },
  { icon: { set: 'Maps', name: 'Crosshair' }, label: 'Goals' },
  { icon: { set: 'System', name: 'DotsSixVertical' }, label: 'More' },
];

export default function BottomBar({
  className,
  items = DEFAULT_ITEMS,
  activeIndex = 0,
  onChange,
}: BottomBarProps) {
  const [current, setCurrent] = useSyncedState(activeIndex);
  const visible = items.slice(0, 5);

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.links}>
        {visible.map((item, index) => (
          <button
            key={index}
            type="button"
            className={styles.linkButton}
            onClick={() => {
              setCurrent(index);
              onChange?.(index);
            }}
          >
            <TabLink icon={item.icon} label={item.label} indicator={current === index} />
          </button>
        ))}
      </div>
      <HomeIndicator />
    </div>
  );
}
