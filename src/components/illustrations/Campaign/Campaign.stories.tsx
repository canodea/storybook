import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Campaign from "./Campaign";

const description = `ODEA MOBILE | Campaign. Kampanya ve teklif ekranlarında kullanılan dekoratif illüstrasyon. Tek başına kampanya koşulu anlatmaz. Figma'da varyantı yoktur; yalnız Size özelliği vardır. Görsel dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur; illüstrasyon renkleri Figma assetinden gelir.`;

const meta = {
  title: "Foundations/Illustrations/Campaign",
  component: Campaign,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Campaign>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = ThemeArgs & { size: number };

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, size: 240 },
  argTypes: {
    ...themeArgTypes,
    size: {
      name: "Size",
      description: "Piksel cinsinden genişlik; yükseklik orana göre ölçeklenir.",
      control: { type: "range", min: 60, max: 240, step: 4 },
      table: { category: "Görünüm" },
    },
  },
  render: (a) => <Campaign size={a.size} />,
};

export const Varsayilan: Story = {
  name: "Varsayılan",
};

export const KucukOlcek: Story = {
  name: "Uç durum · Küçük ölçek",
  args: { size: 60 },
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
      <Campaign />
      <Campaign size={144} />
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
