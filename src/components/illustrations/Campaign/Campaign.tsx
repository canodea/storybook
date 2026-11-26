import campaignSvg from './assets/campaign.svg';
import styles from './Campaign.module.css';

export type CampaignProps = {
  className?: string;
  /** Piksel cinsinden genişlik; yükseklik en-boy oranıyla ölçeklenir. */
  size?: number;
};

export default function Campaign({ className, size = 240 }: CampaignProps) {
  return (
    <img
      className={[styles.root, className].filter(Boolean).join(' ')}
      src={campaignSvg}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
