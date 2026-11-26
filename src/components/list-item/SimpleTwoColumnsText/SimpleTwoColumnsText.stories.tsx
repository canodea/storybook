import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeArgs, themeArgTypes, type ThemeArgs } from "../../../docs-ui/playgroundTheme";
import SimpleTwoColumnsText, {
  type SimpleTwoColumnsTextLayout,
  type SimpleTwoColumnsTextProps,
} from "./SimpleTwoColumnsText";

const meta = {
  title: "Components/List Item/Simple 2 Columns Text",
  component: SimpleTwoColumnsText,
  parameters: {
    docs: {
      description: {
        component:
          "ODEA MOBILE | Simple 2 columns text. Hesap/harcama özeti, varlık ve hisse performansını iki sütunda gösterir. Görünüm tek `layout` prop'uyla seçilir: fund, stock, stock-right, owner, account-activity. Pozitif/negatif/nötr gerçek veriye göre renklenir.",
      },
    },
  },
} satisfies Meta<typeof SimpleTwoColumnsText>;

export default meta;
type Story = StoryObj<typeof meta>;

const COMPANIES = [
  "turkish-airlines",
  "tesla",
  "netflix",
  "turkcell",
  "microsoft",
  "google",
  "apple",
] as const;

type PlaygroundArgs = {
  layout: SimpleTwoColumnsTextLayout;
  fullWidth: boolean;
  // fund
  fundName: string;
  change: string;
  unitValue: string;
  percentage: string;
  priceChange: "positive" | "negative" | "neutral";
  // stock
  ticker: string;
  companyName: string;
  category: string;
  avatar: boolean;
  company: (typeof COMPANIES)[number];
  // owner
  ownerCaption: string;
  ownerName: string;
  // account-activity
  spendingLabel: string;
  spendingValue: string;
  transactionAmount: string;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): SimpleTwoColumnsTextProps => ({
  layout: a.layout,
  fullWidth: a.fullWidth,
  fundName: a.fundName,
  change: a.change,
  unitValue: a.unitValue,
  percentage: a.percentage,
  priceChange: a.priceChange,
  ticker: a.ticker,
  companyName: a.companyName,
  category: a.category,
  avatar: a.avatar,
  company: a.company,
  ownerCaption: a.ownerCaption,
  ownerName: a.ownerName,
  spendingLabel: a.spendingLabel,
  spendingValue: a.spendingValue,
  transactionAmount: a.transactionAmount,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    layout: "fund",
    fullWidth: false,
    fundName: "Title",
    change: "+1,234",
    unitValue: "1.2345",
    percentage: "%12,34",
    priceChange: "positive",
    ticker: "TICKER",
    companyName: "Company Name",
    category: "Stock",
    avatar: true,
    company: "apple",
    ownerCaption: "Owner",
    ownerName: "Name Surname",
    spendingLabel: "Label",
    spendingValue: "1.234,56 TL",
    transactionAmount: "1.234 USD",
  },
  argTypes: {
    ...themeArgTypes,
    layout: {
      name: "Layout",
      control: "select",
      options: ["fund", "stock", "stock-right", "owner", "account-activity"],
      table: { category: "Görünüm" },
    },
    fullWidth: { name: "Full Width", table: { category: "Görünüm" } },
    fundName: { name: "Fund Name", table: { category: "Fund" }, if: { arg: "layout", eq: "fund" } },
    change: { name: "Change", table: { category: "Fund" }, if: { arg: "layout", eq: "fund" } },
    unitValue: { name: "Unit Value", table: { category: "Fund" }, if: { arg: "layout", eq: "fund" } },
    percentage: { name: "Percentage", table: { category: "Fund" }, if: { arg: "layout", eq: "fund" } },
    priceChange: {
      name: "Price Change",
      control: "select",
      options: ["positive", "negative", "neutral"],
      table: { category: "Fund" },
      if: { arg: "layout", eq: "fund" },
    },
    ticker: {
      name: "Ticker",
      table: { category: "Stock" },
    },
    companyName: {
      name: "Company Name",
      table: { category: "Stock" },
    },
    category: {
      name: "Category",
      table: { category: "Stock" },
    },
    avatar: {
      name: "Avatar",
      table: { category: "Stock" },
    },
    company: {
      name: "Company",
      control: "select",
      options: COMPANIES,
      table: { category: "Stock" },
    },
    ownerCaption: { name: "Owner Caption", table: { category: "Owner" }, if: { arg: "layout", eq: "owner" } },
    ownerName: { name: "Owner Name", table: { category: "Owner" }, if: { arg: "layout", eq: "owner" } },
    spendingLabel: {
      name: "Spending Label",
      table: { category: "Account Activity" },
      if: { arg: "layout", eq: "account-activity" },
    },
    spendingValue: {
      name: "Spending Value",
      table: { category: "Account Activity" },
      if: { arg: "layout", eq: "account-activity" },
    },
    transactionAmount: {
      name: "Transaction Amount",
      table: { category: "Account Activity" },
      if: { arg: "layout", eq: "account-activity" },
    },
  },
  render: (args) => <SimpleTwoColumnsText {...toProps(args)} />,
};

export const Fon: Story = {
  name: "Fon",
  args: { layout: "fund" },
};

export const FonNegatif: Story = {
  name: "Fon · negatif",
  args: { layout: "fund", change: "-1.234,56", priceChange: "negative" },
};

export const FonNotr: Story = {
  name: "Fon · nötr",
  args: { layout: "fund", change: "0,0", priceChange: "neutral" },
};

export const Hisse: Story = {
  name: "Hisse",
  args: { layout: "stock", avatar: true, company: "apple" },
};

export const HisseSag: Story = {
  name: "Hisse · sağ başlık",
  args: { layout: "stock-right", avatar: true, company: "tesla" },
};

export const Sahip: Story = {
  name: "Sahip",
  args: { layout: "owner" },
};

export const HesapHareketi: Story = {
  name: "Hesap hareketi",
  args: { layout: "account-activity" },
};

export const UzunTutar: Story = {
  name: "Uç durum · Uzun tutar",
  args: { layout: "account-activity", spendingValue: "1.234.567,89 TL", transactionAmount: "1.234.567,89 USD" },
};

export const Senaryolar: Story = {
  args: { layout: "fund" },
  render: () => (
    <div
      style={{
        background: "var(--odea-background-canvas)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 16,
        padding: 24,
      }}
    >
      <SimpleTwoColumnsText layout="fund" />
      <SimpleTwoColumnsText layout="stock" avatar company="apple" />
      <SimpleTwoColumnsText layout="stock-right" avatar company="tesla" />
      <SimpleTwoColumnsText layout="owner" />
      <SimpleTwoColumnsText layout="account-activity" />
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir.
Playground.parameters = {
  ...Playground.parameters,
  controls: {
    include: Object.keys(Playground.args ?? {}).map(
      (key) =>
        (Playground.argTypes as Record<string, { name?: string }> | undefined)?.[key]?.name ?? key,
    ),
  },
};
