import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import BankAssets from "./BankAssets";

const description = `ODEA MOBILE | Bank Assets. Banka, dijital bankacılık ve ATM temsilleri. Arka planlı varyantlar kart ve bölüm görsellerinde, arka plansız varyantlar serbest yerleşimde kullanılır. Figma'daki Type özelliği ve Size. Görsel dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur; illüstrasyon renkleri Figma assetinden gelir.`;

const meta = {
  title: "Foundations/Illustrations/Bank Assets",
  component: BankAssets,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof BankAssets>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = ThemeArgs & { type: "bank" | "digital-banking" | "bank-w-bg" | "atm-w-bg" | "atm"; size: number };

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, type: "bank", size: 320 },
  argTypes: {
    ...themeArgTypes,
    type: {
      name: "Type",
      description: "Figma: Type.",
      control: "inline-radio",
      options: ["bank", "digital-banking", "bank-w-bg", "atm-w-bg", "atm"],
      table: { category: "Görünüm" },
    },
    size: {
      name: "Size",
      description: "Piksel cinsinden genişlik; yükseklik orana göre ölçeklenir.",
      control: { type: "range", min: 80, max: 320, step: 4 },
      table: { category: "Görünüm" },
    },
  },
  render: (a) => <BankAssets type={a.type} size={a.size} />,
};

export const Varsayilan: Story = {
  name: "Varsayılan",
};

export const KucukOlcek: Story = {
  name: "Uç durum · Küçük ölçek",
  args: { size: 80 },
};

export const Senaryolar: Story = {
  name: "Senaryolar",
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 32,
        alignItems: "center",
        padding: 32,
        background: "var(--odea-background-canvas)",
      }}
    >
      <BankAssets type="bank" />
      <BankAssets type="digital-banking" />
      <BankAssets type="bank-w-bg" />
      <BankAssets type="atm-w-bg" />
      <BankAssets type="atm" />
    </div>
  ),
};

// Playground yalnız Figma'daki özellikleri gösterir; bileşenin ham prop'ları (className vb.) burada gizlenir.
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
