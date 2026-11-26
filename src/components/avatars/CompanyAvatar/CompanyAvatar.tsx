import companyApple from './assets/company-apple.png';
import companyGoogle from './assets/company-google.png';
import companyMicrosoft from './assets/company-microsoft.png';
import companyNetflix from './assets/company-netflix.png';
import companyTesla from './assets/company-tesla.png';
import companyTurkcell from './assets/company-turkcell.png';
import companyTurkishAirlines from './assets/company-turkish-airlines.png';
import styles from './CompanyAvatar.module.css';

export type CompanyAvatarSize = 'small' | 'base' | 'medium' | 'large';
export type CompanyAvatarCompany =
  | 'turkish-airlines'
  | 'tesla'
  | 'netflix'
  | 'turkcell'
  | 'microsoft'
  | 'google'
  | 'apple';

export type CompanyAvatarProps = {
  className?: string;
  size?: CompanyAvatarSize;
  company?: CompanyAvatarCompany;
};

const SIZE_PX: Record<CompanyAvatarSize, number> = { small: 16, base: 24, medium: 32, large: 40 };

const LOGOS: Record<CompanyAvatarCompany, string> = {
  'turkish-airlines': companyTurkishAirlines,
  tesla: companyTesla,
  netflix: companyNetflix,
  turkcell: companyTurkcell,
  microsoft: companyMicrosoft,
  google: companyGoogle,
  apple: companyApple,
};

export default function CompanyAvatar({ className, size = 'base', company = 'apple' }: CompanyAvatarProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <img
        src={LOGOS[company]}
        alt=""
        aria-hidden="true"
        width={SIZE_PX[size]}
        height={SIZE_PX[size]}
        className={styles.image}
      />
    </div>
  );
}
