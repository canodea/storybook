import type { ReactNode } from "react";
import { Icon, type IconSet } from "../../foundations";
import physicalCardImage from "./assets/card-physical.png";
import mastercardIcon from "./assets/mastercard.svg";
import CurrencyAvatar from "../avatars/CurrencyAvatar/CurrencyAvatar";
import styles from "./SummaryCard.module.css";

const cx = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export type SummaryCardType = "card" | "account" | "loan";

export type SummaryCardProps = {
  className?: string;
  type?: SummaryCardType;
  /** @deprecated Dropdown, onDropdownClick verildiğinde otomatik görünür. */
  dropdown?: boolean;
  /**
   * Yalnız Card için geçerlidir; Account ve Loan her zaman görselli çizilir.
   * true: tipin varsayılan görseli. ReactNode: özel görsel. false: görsel yok.
   */
  media?: boolean | ReactNode;
  title?: string;
  subtitle?: string;
  label?: string;
  primaryValue?: string;
  secondaryValue?: string;
  /** Tipin varsayılan görselinin yerine geçer; verildiğinde media açık sayılır. */
  leading?: ReactNode;
  /** Figma: Loan Icon (instance swap). Kredi tipinin ikonu. */
  loanIcon?: { set: IconSet; name: string };
  onDropdownClick?: () => void;
};

const ariaLabels: Record<SummaryCardType, string> = {
  card: "Kart detaylarını göster",
  account: "Hesap detaylarını göster",
  loan: "Kredi detaylarını göster",
};

export default function SummaryCard({
  className,
  type = "card",
  dropdown,
  media,
  title,
  subtitle,
  label = "Label",
  primaryValue,
  secondaryValue,
  leading,
  onDropdownClick,
  loanIcon = { set: "Banking", name: "Money Plus" },
}: SummaryCardProps) {
  const mediaNode = typeof media !== "boolean" ? media : null;
  const leadingNode = leading ?? mediaNode;
  // Figma: yalnız Card'da Media=False vardır; Account ve Loan her zaman görselli.
  const withMedia =
    type !== "card" ||
    (typeof media === "boolean"
      ? media || leading != null
      : media != null || leading != null);
  const showDropdown = Boolean(onDropdownClick || dropdown);

  const defaults =
    type === "card"
      ? {
          title: "Title",
          subtitle: "0000 **** **** 0000",
          primaryValue: "1.234,56 TL",
          secondaryValue: "1.234,56 TL",
        }
      : type === "account"
        ? {
            title: "Title",
            subtitle: "000 - 0000 - 000 Sub text goes here",
            primaryValue: "1.234,56 TL",
            secondaryValue: "1.234,56 TL",
          }
        : {
            title: "Title",
            subtitle: "0000 - 000000 - 000",
            primaryValue: "01.01.2025",
            secondaryValue: "1.234,56 TL",
          };

  const resolvedTitle = title ?? defaults.title;
  const resolvedSubtitle = subtitle ?? defaults.subtitle;
  const resolvedPrimaryValue = primaryValue ?? defaults.primaryValue;
  const resolvedSecondaryValue = secondaryValue ?? defaults.secondaryValue;

  const dropdownButton = (direction: "down" | "right") => (
    <button
      type="button"
      className={styles.dropdownButton}
      aria-label={ariaLabels[type]}
      onClick={onDropdownClick}
    >
      <Icon
        set="Arrows / Caret"
        name={direction === "down" ? "Down" : "Right"}
        size={24}
        className={styles.dropdownIcon}
      />
    </button>
  );

  const physicalCard = (
    <div className={styles.physicalCard}>
      <div className={styles.physicalFrame}>
        <div className={styles.physicalClip}>
          <img
            alt=""
            aria-hidden="true"
            className={styles.physicalImage}
            src={physicalCardImage}
          />
        </div>
      </div>
    </div>
  );

  const mastercard = (
    <div className={styles.cardLogo}>
      <div className={styles.paymentMethod}>
        <div className={styles.mastercard}>
          <img alt="" aria-hidden="true" src={mastercardIcon} />
        </div>
      </div>
    </div>
  );

  // Figma: Currency Avatar / Size=Small (16 px daire, 12 px TL ikonu).
  // Figma'da avatar her iki temada koyu zeminli; data-theme="dark" token'ları alt ağaçta ezer.
  const currencyAvatar = () => (
    <span data-theme="dark" className={styles.currencyAvatarDark}>
      <CurrencyAvatar size="small" />
    </span>
  );

  const bankingIconNode = (className: string, size: number) => (
    <div className={className}>
      <Icon {...loanIcon} size={size} />
    </div>
  );

  const summaryRows = (
    <div className={styles.bottom}>
      <div className={styles.primaryRow}>
        <p className={styles.primaryLabel}>{label}</p>
        <div className={styles.primaryValue}>
          <p>{resolvedPrimaryValue}</p>
        </div>
      </div>
      <div className={styles.secondaryRow}>
        <p className={styles.secondaryLabel}>{label}</p>
        <div className={styles.secondaryValue}>
          <p>{resolvedSecondaryValue}</p>
        </div>
      </div>
    </div>
  );

  if (type === "card") {
    return (
      <article
        className={cx(
          styles.card,
          styles.extended,
          styles.typeCard,
          withMedia && styles.extendedMedia,
          className,
        )}
      >
        {withMedia ? (
          <div className={styles.top}>
            {leadingNode ?? physicalCard}
            <div className={styles.info}>
              <p className={styles.nameGrow}>{resolvedTitle}</p>
              <p className={styles.number}>{resolvedSubtitle}</p>
            </div>
            {/* Figma: Type=Card, Media=True varyantında dropdown yoktur. */}
          </div>
        ) : (
          <div className={cx(styles.top, styles.topStacked)}>
            <div className={styles.nameRow}>
              <div className={styles.inlineCluster}>
                {leadingNode ?? mastercard}
                <p className={styles.inlineName}>{resolvedTitle}</p>
              </div>
              {showDropdown && dropdownButton("right")}
            </div>
            <p className={styles.number}>{resolvedSubtitle}</p>
          </div>
        )}
        {summaryRows}
      </article>
    );
  }

  if (type === "account") {
    return (
      <article
        className={cx(styles.card, styles.extended, styles.typeAccount, className)}
      >
        <div className={cx(styles.top, styles.topColumn)}>
          <div className={styles.topRow}>
            <div className={styles.inlineCluster}>
              {leadingNode ?? currencyAvatar()}
              <p className={styles.inlineName}>{resolvedTitle}</p>
            </div>
            {showDropdown && dropdownButton("right")}
          </div>
          <p className={styles.number}>{resolvedSubtitle}</p>
        </div>
        {summaryRows}
      </article>
    );
  }

  return (
    <article
      className={cx(styles.card, styles.extended, styles.typeLoan, className)}
    >
      <div className={cx(styles.top, styles.topColumn)}>
        <div className={styles.topRow}>
          <div className={styles.inlineCluster}>
            {leadingNode ?? bankingIconNode(styles.bankingIcon16, 16)}
            <p className={styles.inlineName}>{resolvedTitle}</p>
          </div>
          {showDropdown && dropdownButton("right")}
        </div>
        <p className={styles.number}>{resolvedSubtitle}</p>
      </div>
      {summaryRows}
    </article>
  );
}
