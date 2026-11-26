import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../docs-ui/playgroundTheme";
import NewAssetCard, { type NewAssetCardProps } from "./NewAssetCard";

const description = `ODEA MOBILE | New Asset Card. Varlık kartı; başlık, tutar ve CTA'dan oluşur. Başlığın sağına bilgi ikonu eklenebilir; tıklanabilirse "Bilgi" etiketli buton olur. Tutar tam kısım (Heading LG) ve ondalık + para birimi (Heading Base) olarak alt çizgiye hizalı yazılır. Göz butonu tutarı gizler/gösterir; gizliyken tam kısım "***", ondalık ",**" olur, para birimi görünür kalır. CTA Toggles açıkken CTA göster/gizle düğmesi olur; etiketi GİZLE/GÖSTER, ikonu göz olarak değişir. Currency Switcher ve CTA ikonu aç/kapa özellikleridir. Metin ve tutarlar dummy örnektir. Tema: Dark Mode varyantı yoktur; renkler token üzerinden otomatik değişir.`;

const meta = {
  title: "Components/Cards/New Asset Card",
  component: NewAssetCard,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof NewAssetCard>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  titleText: string;
  amountText: string;
  decimalText: string;
  currencyText: string;
  hidden: boolean;
  showEye: boolean;
  currencySwitcher: boolean;
  ctaText: string;
  ctaIcon: boolean;
  ctaToggles: boolean;
  hideLabel: string;
  showLabel: string;
  infoIcon: boolean;
} & ThemeArgs;

const toProps = (a: PlaygroundArgs): NewAssetCardProps => ({
  title: a.titleText || undefined,
  amount: a.amountText || undefined,
  decimal: a.decimalText || undefined,
  currency: a.currencyText || undefined,
  hidden: a.hidden,
  showEye: a.ctaToggles ? undefined : a.showEye,
  currencySwitcher: a.currencySwitcher,
  ctaLabel: a.ctaText || undefined,
  ctaIcon: a.ctaIcon,
  ctaToggles: a.ctaToggles,
  hideLabel: a.hideLabel || undefined,
  showLabel: a.showLabel || undefined,
  infoIcon: a.infoIcon,
});

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    ...themeArgs,
    titleText: "Assets",
    amountText: "1.234",
    decimalText: ",56",
    currencyText: "TL",
    hidden: false,
    showEye: true,
    currencySwitcher: false,
    ctaText: "Call-To-Action",
    ctaIcon: false,
    ctaToggles: false,
    hideLabel: "GİZLE",
    showLabel: "GÖSTER",
    infoIcon: false,
  },
  argTypes: {
    ...themeArgTypes,
    titleText: { name: "Title", table: { category: "İçerik" } },
    amountText: { name: "Amount", table: { category: "İçerik" } },
    decimalText: { name: "Decimal", table: { category: "İçerik" } },
    currencyText: { name: "Currency", table: { category: "İçerik" } },
    hidden: { name: "Hidden", table: { category: "Durum" } },
    showEye: {
      name: "Show Eye",
      if: { arg: "ctaToggles", truthy: false },
      table: { category: "Görünüm" },
    },
    currencySwitcher: {
      name: "Currency Switcher",
      table: { category: "Görünüm" },
    },
    ctaText: {
      name: "CTA Label",
      if: { arg: "ctaToggles", truthy: false },
      table: { category: "İçerik" },
    },
    ctaIcon: { name: "CTA Icon", table: { category: "Görünüm" } },
    ctaToggles: { name: "CTA Toggles", table: { category: "Görünüm" } },
    hideLabel: {
      name: "Hide Label",
      if: { arg: "ctaToggles" },
      table: { category: "İçerik" },
    },
    showLabel: {
      name: "Show Label",
      if: { arg: "ctaToggles" },
      table: { category: "İçerik" },
    },
    infoIcon: { name: "Info Icon", table: { category: "Görünüm" } },
  },
  render: (args) => (
    <div style={{ width: 327 }}>
      <NewAssetCard {...toProps(args)} />
    </div>
  ),
};

export const Gizli: Story = {
  name: "Gizli",
  args: {
    title: "Assets",
    amount: "1.234",
    decimal: ",56",
    currency: "TL",
    hidden: true,
    showEye: true,
    ctaLabel: "Call-To-Action",
  },
  render: (args) => (
    <div style={{ width: 327 }}>
      <NewAssetCard {...args} />
    </div>
  ),
};

export const ParaBirimiSecicili: Story = {
  name: "Para birimi seçicili",
  args: {
    title: "Assets",
    amount: "1.234",
    decimal: ",56",
    currency: "TL",
    showEye: true,
    currencySwitcher: true,
    ctaLabel: "Call-To-Action",
    ctaIcon: true,
  },
  render: (args) => (
    <div style={{ width: 327 }}>
      <NewAssetCard {...args} />
    </div>
  ),
};

export const BilgiIkonlu: Story = {
  name: "Bilgi ikonlu",
  args: {
    title: "Assets",
    amount: "1.234",
    decimal: ",56",
    currency: "TL",
    showEye: true,
    ctaLabel: "Call-To-Action",
    infoIcon: true,
  },
  render: (args) => (
    <div style={{ width: 327 }}>
      <NewAssetCard {...args} />
    </div>
  ),
};

export const CtaIleGosterGizle: Story = {
  name: "CTA ile göster/gizle",
  args: {
    title: "Assets",
    amount: "1.234",
    decimal: ",56",
    currency: "TL",
    ctaToggles: true,
  },
  render: (args) => (
    <div style={{ width: 327 }}>
      <NewAssetCard {...args} />
    </div>
  ),
};

const senaryolar = [true, false]
  .flatMap((showEye) =>
    [true, false].flatMap((currencySwitcher) =>
      [true, false].map((ctaIcon) => ({
        showEye,
        currencySwitcher,
        ctaIcon,
        infoIcon: false,
        ctaToggles: false,
      })),
    ),
  )
  .concat([
    {
      showEye: true,
      currencySwitcher: false,
      ctaIcon: false,
      infoIcon: true,
      ctaToggles: false,
    },
    {
      showEye: false,
      currencySwitcher: false,
      ctaIcon: false,
      infoIcon: false,
      ctaToggles: true,
    },
  ]);

export const Senaryolar: Story = {
  args: {
    title: "Assets",
    amount: "1.234",
    decimal: ",56",
    currency: "TL",
    showEye: true,
    currencySwitcher: false,
    ctaLabel: "Call-To-Action",
    ctaIcon: false,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        padding: 24,
        background: "var(--odea-background-canvas)",
      }}
    >
      {senaryolar.map((args, i) => (
        <div key={i} style={{ width: 327 }}>
          <NewAssetCard
            title="Assets"
            amount="1.234"
            decimal=",56"
            currency="TL"
            ctaLabel="Call-To-Action"
            {...args}
          />
        </div>
      ))}
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları burada gizlenir.
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
