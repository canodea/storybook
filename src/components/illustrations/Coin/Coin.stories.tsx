import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Coin from "./Coin";

const description = `ODEA MOBILE | Coin. Birikim ve para tutarlarını temsil eden para illüstrasyonu. Altın ve beyaz renk, tek para ve para yığını ile birleşir. Figma'daki Color ve Amount özellikleri ve Size. Görsel dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur; illüstrasyon renkleri Figma assetinden gelir.`;

const meta = {
  title: "Foundations/Illustrations/Coin",
  component: Coin,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Coin>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = ThemeArgs & { color: "gold" | "white"; amount: "single" | "stack"; size: number };

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, color: "gold", amount: "single", size: 80 },
  argTypes: {
    ...themeArgTypes,
    color: {
      name: "Color",
      description: "Figma: Color.",
      control: "inline-radio",
      options: ["gold", "white"],
      table: { category: "Görünüm" },
    },
    amount: {
      name: "Amount",
      description: "Figma: Amount.",
      control: "inline-radio",
      options: ["single", "stack"],
      table: { category: "Görünüm" },
    },
    size: {
      name: "Size",
      description: "Piksel cinsinden genişlik; yükseklik orana göre ölçeklenir.",
      control: { type: "range", min: 20, max: 80, step: 4 },
      table: { category: "Görünüm" },
    },
  },
  render: (a) => <Coin color={a.color} amount={a.amount} size={a.size} />,
};

export const Varsayilan: Story = {
  name: "Varsayılan",
};

export const KucukOlcek: Story = {
  name: "Uç durum · Küçük ölçek",
  args: { size: 24 },
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
      <Coin color="gold" amount="single" />
      <Coin color="gold" amount="stack" />
      <Coin color="white" amount="single" />
      <Coin color="white" amount="stack" />
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
