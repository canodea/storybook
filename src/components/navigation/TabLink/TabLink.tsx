import { Icon, type IconSet } from '../../../foundations';
import styles from './TabLink.module.css';

export type TabLinkTab = 'investbook' | 'banking' | 'investments' | 'goals' | 'more';

export type TabLinkIcon = { set: IconSet; name: string };

export type TabLinkProps = {
  className?: string;
  tab?: TabLinkTab;
  indicator?: boolean;
  icon?: TabLinkIcon;
  label?: string;
};

const TAB_META: Record<TabLinkTab, { icon: { set: IconSet; name: string }; label: string }> = {
  investbook: { icon: { set: 'Maps', name: 'HouseSimple' }, label: 'Home' },
  banking: { icon: { set: 'Math', name: 'Bank' }, label: 'Banking' },
  investments: { icon: { set: 'Math', name: 'ChartBarSimple' }, label: 'Investments' },
  goals: { icon: { set: 'Maps', name: 'Crosshair' }, label: 'Goals' },
  more: { icon: { set: 'System', name: 'DotsSixVertical' }, label: 'More' },
};

export default function TabLink({ className, tab, indicator = false, icon, label }: TabLinkProps) {
  const meta = tab ? TAB_META[tab] : undefined;
  const iconProps = icon ?? meta?.icon;
  const text = label ?? meta?.label;

  return (
    <div className={[styles.root, indicator ? styles.on : styles.off, className].filter(Boolean).join(' ')}>
      <div className={styles.iconGroup}>
        <span className={styles.dot} />
        {iconProps && <Icon {...iconProps} size={24} className={styles.icon} />}
      </div>
      {text && <span className={styles.label}>{text}</span>}
    </div>
  );
}
