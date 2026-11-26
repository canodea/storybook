import type { ReactNode } from 'react';
import { WomanAnalyze } from '../illustrations/WomanAnalyze';
import styles from './CampaignCard.module.css';

export type CampaignCardProps = {
  className?: string;
  title?: string;
  description?: string;
  linkLabel?: string;
  /** Figma: Show Link. */
  showLink?: boolean;
  /** Figma'daki illüstrasyon; verilmezse Woman Analyze (88 px) kullanılır. */
  illustration?: ReactNode;
  onLinkClick?: () => void;
};

export default function CampaignCard({
  className,
  title = 'Title',
  description = 'Description goes here',
  linkLabel = 'TEXT LINK',
  showLink = true,
  illustration,
  onLinkClick,
}: CampaignCardProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <div className={styles.media}>
        {illustration ?? <WomanAnalyze size={88} />}
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        {showLink ? (
          <button type="button" className={styles.link} onClick={onLinkClick}>
            {linkLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
