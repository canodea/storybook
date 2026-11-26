import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
  NONE,
  withNone,
  type IconChoice,
} from "../../docs-ui/playgroundTheme";
import MonthlyActivityItem, {
  type MonthlyActivityItemProps,
} from "./MonthlyActivityItem";
import ActivityItem, { type ActivityItemProps } from "../ActivityItem/ActivityItem";

const ornekIslemler: ActivityItemProps[] = [
  {
    date: { day: "24", month: "AĞU", year: "2023" },
    title: "Title",
    description: "Sub text goes here",
    amount: "-1.234,56 TL",
    status: "Label",
  },
  {
    date: { day: "15", month: "AĞU", year: "2023" },
    title: "Title 2",
    description: "Text goes here",
    amount: "-1.234,56 TL",
  },
  {
    date: { day: "01", month: "AĞU", year: "2023" },
    title: "Title 3",
    description: "Name Surname - Text goes here",
    amount: "+1.234,56 TL",
  },
];

const islemler = ornekIslemler.map((item) => <ActivityItem key={item.title} {...item} />);

const description = `ODEA MOBILE | Monthly Activity Item. Odea Mobil aylık işlem toplamı satırı; Ay etiketi ve tutar dummy metindir; USD True olduğunda seçili para biriminin gösterimi gerçek veriyle tutarlı olmalıdır. Bu satır tek başına para birimi dönüştürme işlemi değildir. Mevcut 375×72px görünümü ve tokenları korunur. İsimlendirme İngilizce, davranış açıklamaları Türkçedir. Bu set içinde olmayan eksen, durum veya tema kombinasyonu üretilmez. Gerçek master component instance kullanılır; detach edilmez. Playground ekranında Figma ile aynı aç/kapa kontrolleri bulunur. Tema: Dark Mode varyantı yoktur. Koyu tema için instance’ı veya üst frame’i 02 - Renkler - Anlamsal ve 12 - Buton koleksiyonlarında Dark moda al; renkler token üzerinden otomatik değişir.`;

const chevronOptions = {
  Down: { set: "Arrows / Caret", name: "Down" },
  Right: { set: "Arrows / Caret", name: "Right" },
  Up: { set: "Arrows / Caret", name: "Up" },
  "Circle Down": { set: "Arrows / Caret Circle", name: "Down" },
} as const;
const meta = {
  title: "Components/Cards/Monthly Activity Item",
  component: MonthlyActivityItem,
  parameters: {
    docs: { description: { component: description } },
  },
  args: {
    usd: false,
  },
} satisfies Meta<typeof MonthlyActivityItem>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  usd: boolean;
  monthLabelText: string;
  amountText: string;
  usdAmountText: string;
  chevronIcon: IconChoice<typeof chevronOptions>;
  expandedArg: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): MonthlyActivityItemProps => ({
  usd: a.usd,
  monthLabel: a.monthLabelText || undefined,
  amount: a.amountText || undefined,
  usdAmount: a.usdAmountText || undefined,
  showChevron: a.chevronIcon !== NONE,
  chevronIcon: a.chevronIcon === NONE ? undefined : chevronOptions[a.chevronIcon],
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    usd: true,
    monthLabelText: "Ağustos 2023",
    amountText: "1.234,56 TL",
    usdAmountText: "1.234,56 USD",
    chevronIcon: "Down",
    expandedArg: false,
  },
  argTypes: {
    ...themeArgTypes,
    usd: { name: "USD", control: "boolean", table: { category: "İçerik" } },
    monthLabelText: { name: "Month Label", table: { category: "İçerik" } },
    amountText: { name: "Amount", table: { category: "İçerik" } },
    usdAmountText: {
      name: "USD Amount",
      if: { arg: "usd" },
      table: { category: "İçerik" },
    },
    chevronIcon: {
      name: "Chevron Icon",
      description: "Figma: Show Chevron + Chevron Icon. Yok = chevron gösterilmez.",
      control: "select",
      options: withNone(chevronOptions),
      table: { category: "Chevron" },
    },
    expandedArg: {
      name: "Expanded",
      description: "Satırı açık başlatır. Satıra tıklayarak da açıp kapatabilirsiniz; altında o ayın işlemleri (Activity Item) listelenir.",
      control: "boolean",
      table: { category: "Açılır liste" },
    },
  },
  render: (args) => (
    <MonthlyActivityItem key={String(args.expandedArg)} {...toProps(args)} defaultExpanded={args.expandedArg}>
      {islemler}
    </MonthlyActivityItem>
  ),
};

export const TlToplami: Story = {
  name: "TL toplamı",
  args: { usd: false },
};

export const UsdKarsiligi: Story = {
  name: "USD karşılığı",
  args: { usd: true },
};

export const AcilirListe: Story = {
  name: "Açılır liste (3 işlem)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <MonthlyActivityItem monthLabel="Ağustos 2023" amount="1.234,56 TL" defaultExpanded>
        {islemler}
      </MonthlyActivityItem>
      <MonthlyActivityItem monthLabel="Temmuz 2023" amount="1.234,56 TL">
        {islemler}
      </MonthlyActivityItem>
      <MonthlyActivityItem monthLabel="Haziran 2023" amount="1.234,56 TL">
        {islemler}
      </MonthlyActivityItem>
    </div>
  ),
};

export const UzunAyEtiketi: Story = {
  name: "Uç durum · Uzun ay etiketi",
  args: { usd: false, monthLabel: "Label" },
};

export const BuyukTutar: Story = {
  name: "Uç durum · Büyük tutar",
  args: { usd: false, amount: "+1.234.567,89 TL" },
};

export const UsdUzunTutar: Story = {
  name: "Uç durum · USD uzun tutar",
  args: { usd: true, amount: "1.234.567,89 TL", usdAmount: "1.234.567,89 USD" },
};

export const Senaryolar: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 25,
        alignItems: "flex-start",
        padding: 32,
        background: "var(--odea-background-canvas)",
      }}
    >
      <MonthlyActivityItem usd={false} />
      <MonthlyActivityItem usd={true} />
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
