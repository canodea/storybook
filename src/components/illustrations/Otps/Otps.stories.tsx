import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  themeArgs,
  themeArgTypes,
  type ThemeArgs,
} from "../../../docs-ui/playgroundTheme";
import Otps from "./Otps";

const description = `ODEA MOBILE | OTPs. Tek kullanımlık şifre akışlarında doğrulama kanalını gösteren illüstrasyon: push bildirimi, e-posta veya SMS. Figma'daki Channel özelliği ve Size. Görsel dekoratiftir, bilgi taşımaz; yanında başlık ve açıklama bulunmalıdır. Tema: Dark Mode varyantı yoktur; illüstrasyon renkleri Figma assetinden gelir.`;

const meta = {
  title: "Foundations/Illustrations/OTPs",
  component: Otps,
  parameters: {
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Otps>;

export default meta;
type Story = StoryObj<typeof meta>;

type PlaygroundArgs = ThemeArgs & { channel: "push-ntf" | "e-mail" | "sms"; size: number };

export const Playground: StoryObj<PlaygroundArgs> = {
  args: { ...themeArgs, channel: "push-ntf", size: 88 },
  argTypes: {
    ...themeArgTypes,
    channel: {
      name: "Channel",
      description: "Figma: Channel.",
      control: "inline-radio",
      options: ["push-ntf", "e-mail", "sms"],
      table: { category: "Görünüm" },
    },
    size: {
      name: "Size",
      description: "Piksel cinsinden genişlik; yükseklik orana göre ölçeklenir.",
      control: { type: "range", min: 22, max: 88, step: 4 },
      table: { category: "Görünüm" },
    },
  },
  render: (a) => <Otps channel={a.channel} size={a.size} />,
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
      <Otps channel="push-ntf" />
      <Otps channel="e-mail" />
      <Otps channel="sms" />
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
