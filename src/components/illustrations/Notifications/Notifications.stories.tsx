import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Notifications from "./Notifications";

const description = `ODEA MOBILE | Notifications. Bildirim izni ve boş bildirim ekranlarında kullanılan zil illüstrasyonu. Altın ve gri renk, etkin ve devre dışı durumla birleşir. Figma'daki Color ve State özellikleri ve Size. Görsel dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur; illüstrasyon renkleri Figma assetinden gelir.`;

const meta = {
  title: "Foundations/Illustrations/Notifications",
  component: Notifications,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = ThemeArgs & { color: "altin" | "gri"; state: "enabled" | "disabled"; size: number };

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, color: "altin", state: "enabled", size: 288 },
  argTypes: {
    ...themeArgTypes,
    color: {
      name: "Color",
      description: "Figma: Color.",
      control: "inline-radio",
      options: ["altin", "gri"],
      table: { category: "Görünüm" },
    },
    state: {
      name: "State",
      description: "Figma: State.",
      control: "inline-radio",
      options: ["enabled", "disabled"],
      table: { category: "Görünüm" },
    },
    size: {
      name: "Size",
      description: "Piksel cinsinden genişlik; yükseklik orana göre ölçeklenir.",
      control: { type: "range", min: 72, max: 288, step: 4 },
      table: { category: "Görünüm" },
    },
  },
  render: (a) => <Notifications color={a.color} state={a.state} size={a.size} />,
};

export const Varsayilan: Story = {
  name: "Varsayılan",
};

export const KucukOlcek: Story = {
  name: "Uç durum · Küçük ölçek",
  args: { size: 72 },
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
      <Notifications color="altin" state="enabled" />
      <Notifications color="altin" state="disabled" />
      <Notifications color="gri" state="enabled" />
      <Notifications color="gri" state="disabled" />
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
