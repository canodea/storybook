import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../docs-ui/playgroundTheme";
import SummaryCard, { type SummaryCardProps } from "./SummaryCard";

const description = `ODEA MOBILE | Summary Card. Figma'daki Card, Account ve Loan setlerini tek bir içerik odaklı Summary Card bileşeninde birleştirir. \`type\` görünümü (card/account/loan) seçer; Figma'da yalnız Extended boyutu vardır.

İçerik prop ile belirlenir: \`title\`, \`subtitle\`, \`label\`, \`primaryValue\` ve \`secondaryValue\` verilmezse tipin örnek metinleri kullanılır. \`media\` yalnız Card için geçerlidir: false iken görsel yoktur, true tipin varsayılan görselini (kart) gösterir, bir ReactNode verilirse özel görsel olarak render edilir. Account ve Loan her zaman görselli çizilir. \`leading\` varsayılan görselin yerine geçer ve görseli açık sayar. Dropdown yalnızca \`onDropdownClick\` verildiğinde görünür; \`dropdown\` boolean'ı geriye dönük uyumluluk için tutulur (deprecated). İkon-only dropdown butonu aria-label taşır, dekoratif görseller gizlidir.

Metinler dummy örnektir; gerçek veriler yetkili kaynaktan gelmelidir. Playground ekranında Figma ile aynı aç/kapa kontrolleri bulunur. Tema: Dark Mode varyantı yoktur; renkler token üzerinden otomatik değişir.`;

const meta = {
  title: "Components/Cards/Summary Card",
  component: SummaryCard,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: description } },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["card", "account", "loan"],
      description: "Figma seti: Card (card), Account (account), Loan (loan).",
    },
    media: {
      control: "boolean",
      description:
        "Yalnız Card için geçerli. true: varsayılan kart görseli, ReactNode: özel görsel, false/undefined: görsel yok. Account ve Loan her zaman görselli çizilir.",
    },
    leading: {
      control: false,
      description: "Varsayılan görselin yerine geçen içerik.",
    },
    dropdown: {
      control: "boolean",
      description:
        "@deprecated — Dropdown, onDropdownClick verildiğinde otomatik görünür.",
    },
    onDropdownClick: {
      control: false,
      description:
        "Verildiğinde dropdown butonu görünür ve tıklamayı karşılar.",
    },
  },
  args: {
    type: "card",
    media: true,
    onDropdownClick: () => {},
  },
} satisfies Meta<typeof SummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const krediKarti: SummaryCardProps = {
  type: "card",
  media: true,
  title: "Title",
  subtitle: "0000 **** **** 0000",
  label: "Label",
  primaryValue: "1.234,56 TL",
  secondaryValue: "5.678,90 TL",
  onDropdownClick: () => {},
};

const kartListesi: SummaryCardProps = {
  type: "card",
  media: false,
  title: "Title 2",
  subtitle: "0000 **** **** 0000",
  label: "Label",
  primaryValue: "1.234,56 TL",
  secondaryValue: "5.678,90 TL",
  onDropdownClick: () => {},
};

const vadesizHesap: SummaryCardProps = {
  type: "account",
  title: "Title 3",
  subtitle: "TR00 0000 0000 0000 0000 0000 00",
  label: "Label",
  primaryValue: "1.234,56 TL",
  secondaryValue: "5.678,90 TL",
};

const kredi: SummaryCardProps = {
  type: "loan",
  title: "Title 4",
  subtitle: "TR00 0000 0000 0000 0000 0000 00",
  label: "Label",
  primaryValue: "21.07.2025",
  secondaryValue: "5.678,90 TL",
  onDropdownClick: () => {},
};

const loanIcons = {
  "Money Plus": { set: "Banking", name: "Money Plus" },
  Installment: { set: "Banking", name: "Installment" },
  CreditCard: { set: "Banking", name: "CreditCard" },
  "Money Transfer": { set: "Banking", name: "Money Transfer" },
  Payment: { set: "Banking", name: "Payment" },
} as const;

type PlaygroundArgs = {
  cardType: "Card" | "Account" | "Loan";
  showMediaToggle: boolean;
  showDropdown: boolean;
  cardName: string;
  accountName: string;
  summaryLabel: string;
  primaryValueText: string;
  secondaryValueText: string;
  loanIconChoice: keyof typeof loanIcons;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): SummaryCardProps => {
  const type =
    a.cardType === "Card" ? "card" : a.cardType === "Account" ? "account" : "loan";

  return {
    type,
    media: a.showMediaToggle,
    dropdown: a.showDropdown,
    title:
      type === "card"
        ? a.cardName
        : type === "account"
          ? a.accountName
          : undefined,
    label: a.summaryLabel,
    primaryValue: a.primaryValueText || undefined,
    secondaryValue: a.secondaryValueText || undefined,
    loanIcon: loanIcons[a.loanIconChoice],
  };
};

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    cardType: "Card",
    showMediaToggle: true,
    loanIconChoice: "Money Plus",
    cardName: "Title",
    accountName: "Title",
    summaryLabel: "Label",
    primaryValueText: "1.234,56 TL",
    secondaryValueText: "5.678,90 TL",
    showDropdown: true,
  },
  argTypes: {
    ...themeArgTypes,
    cardType: {
      name: "Type",
      control: "inline-radio",
      options: ["Card", "Account", "Loan"],
      table: { category: "Tip" },
    },
    showMediaToggle: {
      name: "Media",
      control: "boolean",
      if: { arg: "cardType", eq: "Card" },
      table: { category: "Tip" },
    },
    loanIconChoice: {
      name: "Loan Icon",
      control: "select",
      options: Object.keys(loanIcons) as Array<keyof typeof loanIcons>,
      if: { arg: "cardType", eq: "Loan" },
      table: { category: "Tip" },
    },
    cardName: { name: "Card Name", if: { arg: "cardType", eq: "Card" }, table: { category: "İçerik" } },
    accountName: { name: "Account Name", if: { arg: "cardType", eq: "Account" }, table: { category: "İçerik" } },
    summaryLabel: { name: "Summary Label", table: { category: "İçerik" } },
    primaryValueText: { name: "Primary Value", table: { category: "İçerik" } },
    secondaryValueText: { name: "Secondary Value", table: { category: "İçerik" } },
    showDropdown: { name: "Dropdown", control: "boolean", description: "Figma: Dropdown. Type=Card, Media=True varyantında dropdown yoktur.", table: { category: "Dropdown" } },
  },
  render: (args) => <SummaryCard {...toProps(args)} />,
};

export const KrediKarti: Story = {
  name: "Kredi kartı",
  args: krediKarti,
};

export const KartListesi: Story = {
  name: "Kart listesi",
  args: kartListesi,
};

export const VadesizHesap: Story = {
  name: "Vadesiz hesap",
  args: vadesizHesap,
};

export const Kredi: Story = {
  name: "Kredi",
  args: kredi,
};

export const UzunBaslik: Story = {
  name: "Uç durum · Uzun başlık",
  args: {
    type: "card",
    media: true,
    title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    subtitle: "0000 **** **** 0000",
    label: "Label",
    primaryValue: "1.234,56 TL",
    secondaryValue: "5.678,90 TL",
    onDropdownClick: () => {},
  },
};

export const EksikVeri: Story = {
  name: "Uç durum · Eksik veri",
  args: {
    type: "card",
    media: false,
    dropdown: false,
    onDropdownClick: undefined,
    title: "Title",
    subtitle: "0000 **** **** 0000",
  },
};

export const BuyukTutar: Story = {
  name: "Uç durum · Büyük tutar",
  args: {
    type: "card",
    media: true,
    title: "Title",
    subtitle: "0000 **** **** 0000",
    label: "Label",
    primaryValue: "1.234.567,89 TL",
    secondaryValue: "12.345.678,90 TL",
    onDropdownClick: () => {},
  },
};

const senaryolar: SummaryCardProps[] = [
  krediKarti,
  kartListesi,
  vadesizHesap,
  kredi,
];

export const Senaryolar: Story = {
  args: krediKarti,
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        alignContent: "flex-start",
        gap: 24,
        padding: 24,
        minHeight: "100vh",
        background: "var(--odea-background-canvas)",
      }}
    >
      {senaryolar.map((args) => (
        <SummaryCard key={`${args.type}-${args.title}`} {...args} />
      ))}
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları (dotTone, className vb.) burada gizlenir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (
          Playground.argTypes as Record<string, { name?: string }> | undefined
        )?.[key]?.name ?? key,
    ),
  },
};
