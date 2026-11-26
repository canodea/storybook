import type { ReactNode } from 'react';
import SectionDivider from '../../navigation/SectionDivider';
import HomeIndicator from '../../shared/HomeIndicator';
import styles from './ActionSheet.module.css';

export type ActionSheetProps = {
  className?: string;
  icon?: boolean;
  textLink?: boolean;
  label?: string;
  children?: ReactNode;
  onIconClick?: () => void;
  onTextLinkClick?: () => void;
};

export default function ActionSheet({
  className,
  icon = false,
  textLink = false,
  label = 'Divider',
  children,
  onIconClick,
  onTextLinkClick,
}: ActionSheetProps) {
  // textLink → cta, icon → single-icon, ikisi de yok → base.
  const type = textLink ? 'cta' : icon ? 'single-icon' : 'base';

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <span className={styles.handle} />
      <SectionDivider
        className={styles.divider}
        label={label}
        type={type}
        ctaLabel={label}
        onCtaClick={onTextLinkClick}
        onIconClick={onIconClick}
      />
      {children}
      <HomeIndicator />
    </div>
  );
}
