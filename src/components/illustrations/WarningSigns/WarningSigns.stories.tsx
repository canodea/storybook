import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import WarningSigns from "./WarningSigns";

const description = `ODEA MOBILE | Warning Signs. Uyarı, başarı, bilgi, bekleme ve hata durumlarını gösteren illüstrasyon. Görsel dekoratiftir; durum her zaman yanındaki metinle de açıklanır. Figma'daki Type özelliği ve Size. Görsel dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur; illüstrasyon renkleri Figma assetinden gelir.`;

const meta = {
  title: "Foundations/Illustrations/Warning Signs",
  component: WarningSigns,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof WarningSigns>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = ThemeArgs & { type: "warning" | "success" | "information" | "time-out" | "error"; size: number };

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, type: "warning", size: 88 },
  argTypes: {
    ...themeArgTypes,
    type: {
      name: "Type",
      description: "Figma: Type.",
      control: "inline-radio",
      options: ["warning", "success", "information", "time-out", "error"],
      table: { category: "Görünüm" },
    },
    size: {
      name: "Size",
      description: "Piksel cinsinden genişlik; yükseklik orana göre ölçeklenir.",
      control: { type: "range", min: 22, max: 88, step: 4 },
      table: { category: "Görünüm" },
    },
  },
  render: (a) => <WarningSigns type={a.type} size={a.size} />,
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
      <WarningSigns type="warning" />
      <WarningSigns type="success" />
      <WarningSigns type="information" />
      <WarningSigns type="time-out" />
      <WarningSigns type="error" />
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
