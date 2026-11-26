import CompanyAvatar, { type CompanyAvatarCompany } from '../../avatars/CompanyAvatar';
import styles from './SimpleTwoColumnsText.module.css';

export type SimpleTwoColumnsTextLayout =
  | 'fund'
  | 'stock'
  | 'stock-right'
  | 'owner'
  | 'account-activity';

export type SimpleTwoColumnsTextPriceChange = 'positive' | 'negative' | 'neutral';

export type SimpleTwoColumnsTextProps = {
  className?: string;
  layout?: SimpleTwoColumnsTextLayout;
  fullWidth?: boolean;
  // fund
  fundName?: string;
  change?: string;
  unitValue?: string;
  percentage?: string;
  priceChange?: SimpleTwoColumnsTextPriceChange;
  // stock / stock-right
  ticker?: string;
  companyName?: string;
  category?: string;
  avatar?: boolean;
  company?: CompanyAvatarCompany;
  // owner
  ownerCaption?: string;
  ownerName?: string;
  // account-activity
  spendingLabel?: string;
  spendingValue?: string;
  transactionAmount?: string;
};

export default function SimpleTwoColumnsText({
  className,
  layout = 'fund',
  fullWidth = false,
  fundName = 'Title',
  change = '+1,234',
  unitValue = '1.2345',
  percentage = '%12,34',
  priceChange = 'positive',
  ticker = 'TICKER',
  companyName = 'Company Name',
  category = 'Stock',
  avatar = false,
  company = 'apple',
  ownerCaption = 'Owner',
  ownerName = 'Name Surname',
  spendingLabel = 'Label',
  spendingValue = '1.234,56 TL',
  transactionAmount = '1.234 USD',
}: SimpleTwoColumnsTextProps) {
  const changeClass = {
    positive: styles.changePositive,
    negative: styles.changeNegative,
    neutral: styles.changeNeutral,
  }[priceChange];

  let left: React.ReactNode;
  let right: React.ReactNode;

  switch (layout) {
    case 'fund':
      left = (
        <div className={styles.column}>
          <span className={styles.displayBase}>{fundName}</span>
          <div className={styles.changeRow}>
            <span className={[styles.textSm, changeClass].join(' ')}>{change}</span>
            <span className={styles.textSmSecondary}>{unitValue}</span>
          </div>
        </div>
      );
      right = (
        <div className={[styles.column, styles.columnRight].join(' ')}>
          <span className={styles.textBasePrimary}>{percentage}</span>
        </div>
      );
      break;

    case 'stock':
      left = (
        <div className={styles.column}>
          <div className={styles.tickerRow}>
            {avatar && <CompanyAvatar size="small" company={company} />}
            <span className={styles.displayBase}>{ticker}</span>
          </div>
          <span className={styles.textSmSecondary}>{companyName}</span>
        </div>
      );
      right = (
        <div className={[styles.column, styles.columnRight].join(' ')}>
          <span className={styles.textBasePrimary}>{category}</span>
        </div>
      );
      break;

    case 'stock-right':
      left = (
        <div className={styles.column}>
          <span className={styles.textBasePrimary}>{category}</span>
        </div>
      );
      right = (
        <div className={[styles.column, styles.columnRight].join(' ')}>
          <div className={styles.tickerRow}>
            <span className={styles.displayBase}>{ticker}</span>
            {avatar && <CompanyAvatar size="small" company={company} />}
          </div>
          <span className={styles.textSmSecondary}>{companyName}</span>
        </div>
      );
      break;

    case 'owner':
      left = (
        <div className={styles.column}>
          <span className={styles.textBaseSecondary}>{ownerCaption}</span>
        </div>
      );
      right = (
        <div className={[styles.column, styles.columnRight].join(' ')}>
          <span className={styles.textBasePrimary}>{ownerName}</span>
        </div>
      );
      break;

    case 'account-activity':
      left = (
        <div className={styles.column}>
          <span className={styles.textBaseSecondary}>{spendingLabel}</span>
        </div>
      );
      right = (
        <div className={[styles.column, styles.columnRight].join(' ')}>
          <span className={styles.numbersBasePrimary}>{spendingValue}</span>
          <span className={styles.numbersSmSecondary}>{transactionAmount}</span>
        </div>
      );
      break;
  }

  return (
    <div
      className={[
        styles.root,
        fullWidth && styles.fullWidth,
        layout === 'owner' && styles.owner,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {left}
      {right}
    </div>
  );
}
