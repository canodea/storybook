import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import SmallColumnsGraph from "./SmallColumnsGraph";

const description = `ODEA MOBILE | Small Columns Graph. Küçük kolon grafiği. Dekoratiftir, gerçek veri göstermez; yalnız görsel ritim için kullanılır. Figma'da varyantı yoktur; yalnız Size özelliği vardır. Görsel dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur; illüstrasyon renkleri Figma assetinden gelir.`;

const meta = {
  title: "Foundations/Illustrations/Small Columns Graph",
  component: SmallColumnsGraph,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof SmallColumnsGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = ThemeArgs & { size: number };

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, size: 92 },
  argTypes: {
    ...themeArgTypes,
    size: {
      name: "Size",
      description: "Piksel cinsinden genişlik; yükseklik orana göre ölçeklenir.",
      control: { type: "range", min: 23, max: 92, step: 4 },
      table: { category: "Görünüm" },
    },
  },
  render: (a) => <SmallColumnsGraph size={a.size} />,
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
      <SmallColumnsGraph />
      <SmallColumnsGraph size={55} />
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
